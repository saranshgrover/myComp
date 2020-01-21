import React, { useState, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import { makeStyles } from '@material-ui/core/styles'
import DashboardList from './DashboardList'
import Competition from '../Competition'
import { getWcifPublic, getWcif } from '../../../server/wca-api'
import Error from '../../common/Error'
import { LinearProgress } from '@material-ui/core'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex'
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth
		}
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	}
}))

function Dashboard({
	match,
	location,
	history,
	container,
	mobileOpen,
	setMobileOpen,
	userInfo,
	managableComps,
	upcomingComps
}) {
	const classes = useStyles()
	const onItemChange = text => {
		// Normalize the text
		text = text.replace(/\s/g, '').toLowerCase()
		setCurrentComponent(text)
		history.push(`/competitions/${match.params.compId}/${text}/`)
	}
	const [error, setError] = useState(null)
	const [currentComponent, setCurrentComponent] = useState('overview')
	const [wcif, setWcif] = useState(null)
	const [user, setUser] = useState(null)

	useEffect(() => {
		getWcifPublic(match.params.compId)
			.then(wcifPublic => {
				let user = ''
				const person = wcifPublic.persons.find(
					person => person.wcaUserId === userInfo.me.id
				)
				person
					? person.roles.length > 0
						? (user = 'admin')
						: (user = 'competitor')
					: (user = 'spectator')
				if (user === 'admin') {
					getWcif(match.params.compId)
						.then(wcif => {
							setUser(user)
							setWcif(wcif)
						})
						.catch(err => setError(err.message))
				} else {
					setUser(user)
					setWcif(wcifPublic)
				}
			})
			.catch(err => setError(err.message))
	}, [match.params.compId, userInfo.me.id])
	return (
		<div className={classes.root}>
			{error ? (
				<Error message={error} />
			) : wcif === null ? (
				<LinearProgress />
			) : (
				<>
					<CssBaseline />
					<nav
						className={classes.drawer}
						aria-label='mailbox folders'
					>
						<Hidden smUp implementation='css'>
							<Drawer
								container={container}
								variant='temporary'
								anchor={'left'}
								open={mobileOpen}
								onClose={setMobileOpen}
								classes={{
									paper: classes.drawerPaper
								}}
								ModalProps={{
									keepMounted: true
								}}
							>
								<div>
									<div className={classes.toolbar} />
									<DashboardList
										wcif={wcif}
										user={user}
										onClick={onItemChange}
									/>
								</div>
							</Drawer>
						</Hidden>
						<Hidden xsDown implementation='css'>
							<Drawer
								classes={{
									paper: classes.drawerPaper
								}}
								variant='permanent'
								open
							>
								<div>
									<div className={classes.toolbar} />
									<DashboardList
										wcif={wcif}
										user={user}
										onClick={onItemChange}
									/>
								</div>
							</Drawer>
						</Hidden>
					</nav>
					<main className={classes.content}>
						{
							<>
								<Competition
									wcif={wcif}
									setWcif={setWcif}
									history={history}
									user={user}
									compId={match.params.compId}
									userInfo={userInfo}
								/>
							</>
						}
					</main>
				</>
			)}
		</div>
	)
}

export default Dashboard
