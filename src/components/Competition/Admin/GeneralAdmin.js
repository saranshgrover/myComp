import React from 'react'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import NativeSelect from '@material-ui/core/NativeSelect'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import { setExtensionData, getExtensionData } from '../../../server/wcif'
import { setIn } from '../../../server/tools'
import { TextField } from '@material-ui/core'

export default function GeneralAdmin({ wcif, setWcif, updateGeneralConfig }) {
	const localConfig = getExtensionData('GeneralConfig', wcif)
	const onValueChange = name => event => {
		setWcif(
			setExtensionData(
				'GeneralConfig',
				wcif,
				setIn(
					getExtensionData('GeneralConfig', wcif),
					[name],
					event.target.value
				)
			)
		)
	}
	const onCheckboxChange = name => event => {
		console.log(event.target.checked)
		setWcif(
			setExtensionData(
				'GeneralConfig',
				wcif,
				setIn(
					getExtensionData('GeneralConfig', wcif),
					[name],
					event.target.checked
				)
			)
		)
	}
	const saveWcif = () => {
		updateGeneralConfig()
	}
	return (
		<>
			<ExpansionPanelDetails>
				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								checked={localConfig.useGroups}
								value='useGroups'
								onChange={onCheckboxChange('useGroups')}
							/>
						}
						label='Use myComp for Sharing Groups'
					/>
					<FormHelperText style={{ padding: '10px' }}>
						Selecting this means that a competitor will be able to
						access their groups and assignments on mycomp. Please
						make sure to add a delay if the competition is running
						behind schedule at any point.
					</FormHelperText>
					<FormControlLabel
						control={
							<Switch
								checked={localConfig.manageGroups}
								value='manageGroups'
								onChange={onCheckboxChange('manageGroups')}
							/>
						}
						label='Manage Groups using myComp'
					/>
					<FormHelperText style={{ padding: '10px' }}>
						If you want to enter groups manually - i.e - you are not
						using a group tool like groupifier, please select this
						option.
					</FormHelperText>
					<FormControlLabel
						style={{ padding: '10px' }}
						control={
							<Switch
								checked={localConfig.useTelegramNotif}
								value='useTelegramNotif'
								onChange={onCheckboxChange('useTelegramNotif')}
							/>
						}
						label='Use Telegram Notifications'
					/>
					<TextField
						fullWidth={false}
						variant='outlined'
						value={localConfig.logoLink}
						onChange={onValueChange('logoLink')}
						label='Link to Logo'
					/>
					<FormHelperText style={{ padding: '10px' }}>
						Make sure the image is high quality & transparent
					</FormHelperText>
				</FormGroup>
			</ExpansionPanelDetails>
			<ExpansionPanelActions>
				<Button size='small' color='primary' onClick={() => saveWcif()}>
					Save
				</Button>
			</ExpansionPanelActions>
		</>
	)
}
