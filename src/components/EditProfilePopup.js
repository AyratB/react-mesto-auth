import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "./../contexts/CurrentUserContext.js";

import { FormValidator } from "./../utils/FormValidator.js";
import { validationConfig } from "./../utils/validationConfig.js";

function EditProfilePopup(props) {
  
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isFormWasClosedWithoutSaving, setIsFormWasClosedWithoutSaving] =
    React.useState(false);

  const [formValidator, setValidator] = React.useState({});

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);

  if (
    props.isOpen &&
    isFormWasClosedWithoutSaving &&
    (currentUser.name !== name || currentUser.about !== description)
  ) {
    
    setName(currentUser.name);
    setDescription(currentUser.about);

    setIsFormWasClosedWithoutSaving(false);    
  }

  React.useEffect(() => {

    let editProfileFormValidator = new FormValidator(
      validationConfig,
      document.forms[props.formName]
    );

    setValidator(Object.assign(formValidator, editProfileFormValidator));    

    editProfileFormValidator.enableValidation();    
  }, []);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleFormClose() {
    if (currentUser.name !== name || currentUser.about !== description) {
      setIsFormWasClosedWithoutSaving(true);
    }

    props.onClose();

    if (formValidator) {
      formValidator.clearAllFormErrors();
      formValidator.makeButtonDisable();
    }    
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name={props.formName}
      headerText="Редактировать профиль"
      buttonSaveText="Сохранить"
      isOpen={props.isOpen}
      onClose={handleFormClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <section className="form__section">
        <input
          type="text"
          className="form__input"
          name="edit-profile-name"
          id="edit-profile-name"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleChangeName}
        />
        <span className="form__span-error" id="edit-profile-name-error"></span>
      </section>
      <section className="form__section">
        <input
          type="text"
          className="form__input"
          name="edit-profile-description"
          id="edit-profile-description"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleChangeDescription}
        />
        <span
          className="form__span-error"
          id="edit-profile-description-error"
        ></span>
      </section>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
