// Modal component for update profile section

import React from 'react'
import '../GalleryModal/GalleryModal.scss'

const GalleryModal = (props) => {

	const findByKey = (name) =>
		props.children.map(child => {
			if (child.key === name){
				return child
      }
		})

	const closeModal = (e) => {
		e.stopPropagation()

		if (e.target.classList.contains('gallery-modal-close')) {
			return props.click()
		}
	}

	return (
		<div className='gallery-modal-mask gallery-modal-close' onClick={closeModal}>
			<div className='gallery-modal-wrapper'>
				<div className='gallery-modal-container'>

					<div className='gallery-modal-header'>
						{findByKey('gallery-header')}
					</div>

          <div className='gallery-modal-body'>
						{findByKey('gallery-images')}
					</div>

					<div className='gallery-modal-body'>
						{findByKey('gallery-body')}
					</div>

					<div className='gallery-modal-footer'>
						<button className='gallery-modal-close' onClick={closeModal}>CLOSE</button>
						{findByKey('gallery-footer')}
					</div>

				</div>
			</div>
		</div>
	);
}

export default GalleryModal