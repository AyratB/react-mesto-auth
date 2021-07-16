import React from "react";

import PopupWithForm from "./PopupWithForm.js";

import { FormValidator } from "./../utils/FormValidator.js";
import { validationConfig } from "./../utils/validationConfig.js";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  const [formValidator, setValidator] = React.useState({});

  React.useEffect(() => {    

    let editAvatarFormValidator = new FormValidator(
      validationConfig,
      document.forms[props.formName]
    );

    setValidator(Object.assign(formValidator, editAvatarFormValidator));    

    editAvatarFormValidator.enableValidation(); 
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      url: avatarRef.current.value,
    });
  }

  function handleFormClose(e) {

    props.onClose();

    if (formValidator) {
      formValidator.clearAllFormErrors();
      formValidator.makeButtonDisable();
    }
  }

  return (
    <PopupWithForm
      name={props.formName}
      headerText="Обновить аватар"
      buttonSaveText="Сохранить"
      isOpen={props.isOpen}
      onClose={handleFormClose}
      onSubmit={handleSubmit}
    >
      <section className="form__section">
        <input
          type="url"
          className="form__input"
          name="update-avatar-url"
          id="update-avatar-url"
          placeholder="Ссылка на аватар"
          required
          ref={avatarRef}
        />
        <span className="form__span-error" id="update-avatar-url-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
