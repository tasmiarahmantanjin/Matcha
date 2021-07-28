import React from 'react'
//import TextArea from '../TextArea/TextArea'
import Button from '../Button/Button'
import './Form.css'

const Form = ({ message, onSubmit,  handleChange }) =>{
	return (
		<form className="Form" onSubmit={onSubmit}>
			<textarea className="TextArea" value={message} onChange={handleChange} placeholder="Say something nice!" />
        <Button label='Send'/>
		</form>
	) }

export default Form

