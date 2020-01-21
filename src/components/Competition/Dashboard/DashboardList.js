import React from 'react'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AppsIcon from '@material-ui/icons/Apps'
import VideocamIcon from '@material-ui/icons/Videocam'
import GroupIcon from '@material-ui/icons/Group'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import NotesIcon from '@material-ui/icons/Notes'
import { getExtensionData } from '../../../server/wcif'

export default function DashboardList({ wcif, user, onClick }) {
	const config = getExtensionData('GeneralConfig', wcif)
	const userList = ['Overview']
	config.useGroups && userList.push('Groups')
	config.useTelegramNotif && userList.push('Notifications')
	const adminList = ['Admin']
	console.log(config)
	config.manageGroups && adminList.push('Manage Groups')
	config.recordIncidents && adminList.push('Incidents')
	config.createCertificates && adminList.push('Certificates')
	const getIcon = text => {
		switch (text) {
			case 'Projector':
				return <VideocamIcon />
			case 'Groups':
				return <GroupIcon />
			case 'Notifications':
				return <NotificationsIcon />
			case 'Admin':
				return <SupervisorAccountIcon />
			case 'Incidents':
				return <NotesIcon />
			default:
				return <AppsIcon />
		}
	}
	return (
		<div style={{ marginTop: '15px' }}>
			<Divider />
			<List>
				{userList.map(text => (
					<ListItem button key={text} onClick={() => onClick(text)}>
						<ListItemIcon>{getIcon(text)}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			{user === 'admin' && (
				<List>
					{adminList.map(text => (
						<ListItem
							button
							key={text}
							onClick={() => onClick(text)}
						>
							<ListItemIcon>{getIcon(text)}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			)}
		</div>
	)
}
