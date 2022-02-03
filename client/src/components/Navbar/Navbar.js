import React, { useState, Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { logout } from "../../store/actions/auth";
import logoImage from "../../assets/images/logo_matcha.svg";
// Import for the user update
import Modal from "../Modal/Modal";
import GalleryModal from "../GalleryModal/GalleryModal";
import { updateProfile } from "../../store/actions/auth";
import { uploadToGallery } from "../../store/actions/auth";
import galleryService from "../../services/galleryService";
import chatService from "../../services/chatService";
import io from "socket.io-client"; // For chat.

import "./Navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);

  //console.log(user)

  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [uploadFile, setUploadFile] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);

  const user_id = user.user_id;
  const [first_name, setFirst_name] = useState(user.first_name);
  const [last_name, setLast_name] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);

  // SexPref, Bio & interest update
  const [sexual_orientation, setSexual_orientation] = useState(
    user.sexual_orientation
  );
  const [bio, setBio] = useState(user.bio);
  //const [bioInitial, setBioInitial] = useState('')
  //const [interest, setInterest] = useState(user.interest)

  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(user.avatar);
  const [uploadAvatar, setUploadAvatar] = useState(user.avatar);

  const [interest, setInterest] = useState(user.interest);
  const [birthdate, setBirthdate] = useState(
    formatDate(new Date(user.birthdate))
  );
  //console.log(`Birthdate: ${birthdate}`);
  //console.log(user)
  const [female, setFemale] = useState(false);
  const [male, setMale] = useState(false);
  const [other, setOther] = useState(false);
  const [interestArr, setInterestArr] = useState([]);

  //const [female, setFemale] = useState(inArray('female'))
  //const [male, setMale] = useState(inArray('male'))
  //const [other, setOther] = useState(inArray('other'))

  const [conversationsArr, setConversationsArr] = useState([]);
  const [partnersIdArr, setPartnersIdArr] = useState([]);
  const [partnersArr, setPartnersArr] = useState([]);
  const [messageArr, setMessageArr] = useState();

  /**
   * Chat code starts here
   */
  //const [conversation, setConversation] = useState()
  //const [partner, setPartner] = useState()
  const [messages, setMessages] = useState([]);
  //const [message, setMessage] = useState("");
  const [yourID, setYourID] = useState(user.user_id);

  const socketRef = useRef();

  function receivedMessage(message) {
    //setMessages(oldMsgs => [...oldMsgs, message]);
    //console.log('Now we log messages.');
    //console.log(messages)
    alert(message.message_text); // Alert user to new message!
  }

  /*function sendMessage(e) {
     e.preventDefault();
     const messageObject = {
       message_text: message,
       sender_id: user.user_id,
       timestamp: new Date(),
       conversation: conversation.id,
       partner: partner.user_id // 
     };
     console.log(`Message: ${messageObject.message_text}`)
     setMessage("");
     socketRef.current.emit("send message", messageObject);
   }*/

  useEffect(() => {
    socketRef.current = io.connect("localhost:3001/");
    socketRef.current.emit("create", user.user_id);
    socketRef.current.on("your id", (id) => {
      setYourID(id);
      console.log(`yourID: ${yourID}`);
    });

    socketRef.current.on("message", (message) => {
      console.log("Message.");
      console.log(message);
      receivedMessage(message);
    });
    //});

    /**
     * ... until here.
     */
    //console.log(`Partner to use for fetching partner data: ${partner_id}`)

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  /**
   * Chat code ends here.
   */

  useEffect(() => {
    const requestObject = {
      user: user,
    };
    galleryService.getUserGallery(requestObject).then((initialImages) => {
      console.log(initialImages);
      setGalleryImages(initialImages.rows);
    });
  }, [user]);

  useEffect(() => {
    const requestObject = {
      user: user,
    };
    chatService
      .getConversationsArray(requestObject)
      .then((initialConversations) => {
        console.log(initialConversations);
        setConversationsArr(initialConversations.rows);
      });
  }, [user]);

  // For each conversation fetched, make an array of objects with conversation ID and partner ID.
  useEffect(() => {
    let conversationPartners = [];
    for (let i = 0; i < conversationsArr.length; i++) {
      if (conversationsArr[i].user_one_id === user.user_id) {
        console.log("User is user one.");
        let currentConversation = {
          conversation: conversationsArr[i].id,
          partnerId: conversationsArr[i].user_two_id,
        };
        conversationPartners.push(currentConversation);
      } else {
        console.log("User is user two.");
        let currentConversation = {
          conversation: conversationsArr[i].id,
          partnerId: conversationsArr[i].user_one_id,
        };
        conversationPartners.push(currentConversation);
      }
      /* const requestObject = {
        user: user
      }
      chatService
      .getConversationsArray(requestObject)
      .then(initialConversations => {
        console.log(initialConversations);
        setConversationsArr(initialConversations.rows)
      }) */
    }
    setPartnersIdArr(conversationPartners);
  }, [conversationsArr, user]);

  // For each conversation fetched, make an array of objects with partner name, partner ID, partner avatar, conversation ID.
  useEffect(() => {
    let partners = [];
    for (let i = 0; i < partnersIdArr.length; i++) {
      const requestObject = {
        profile_id: partnersIdArr[i].partnerId,
      };
      chatService.getPartnerProfile(requestObject).then((returnedPartner) => {
        let currentPartner = {
          name:
            returnedPartner.rows[0].first_name.charAt(0).toUpperCase() +
            returnedPartner.rows[0].first_name.slice(1),
          partner_id: partnersIdArr[i].partnerId,
          avatar: returnedPartner.rows[0].avatar,
          conversation: partnersIdArr[i].conversation,
          recentMessageObj: messageArr.filter((message) => {
            return message.conversation === partnersIdArr[i].conversation;
          }),
        };
        console.log(currentPartner);
        partners.push(currentPartner);
      });
    }
    setPartnersArr(partners);
  }, [partnersIdArr, messageArr]);

  // For each conversation fetched, make an array of recent messages.
  useEffect(() => {
    let recentMessages = [];
    for (let i = 0; i < conversationsArr.length; i++) {
      const requestObject = {
        conversation_id: conversationsArr[i].id,
      };
      chatService.getMessages(requestObject).then((returnedMessages) => {
        let currentMessage = {
          conversation: conversationsArr[i].id,
          mostRecentMessage:
            returnedMessages.rows[returnedMessages.rows.length - 1]
              .message_text,
          sender:
            returnedMessages.rows[returnedMessages.rows.length - 1].sender_id,
        };
        console.log(currentMessage.mostRecentMessage);
        //console.log(returnedMessages);
        recentMessages.push(currentMessage);
      });
    }
    setMessageArr(recentMessages);
  }, [conversationsArr, user]);

  useEffect(() => {
    if (sexual_orientation) {
      if (inArray("female")) {
        console.log("Female preference detected.");
        setFemale(true);
      }
      if (inArray("male")) {
        console.log("Male preference detected.");
        setMale(true);
      }
      if (inArray("other")) {
        console.log("Other preference detected.");
        setOther(true);
      }
    }
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  useEffect(() => {
    if (interest) {
      setInterestArr(interest);
    }
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  useEffect(() => {
    if (!bio) {
      setBio("");
    }
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  //console.log(`female = ${female}`)
  //console.log(`male = ${male}`)
  //console.log(`other = ${other}`)

  //var male = inArray('male')
  //var female = inArray('female')
  //var other = inArray('other')
  var checked = [];
  if (sexual_orientation !== null) {
    checked = sexual_orientation;
  }
  //console.log(checked)

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const submitForm = (e) => {
    e.preventDefault();

    const form = {
      user_id,
      first_name,
      last_name,
      email,
      gender,
      sexual_orientation,
      bio,
      interest,
      birthdate,
      uploadAvatar,
    };
    //console.log(interest)
    if (password.length > 0) form.password = password;

    const formData = new FormData();

    for (const key in form) {
      formData.append(key, form[key]);
    }
    dispatch(updateProfile(formData)).then(() => setShowProfileModal(false));
  };

  const submitGalleryForm = (e) => {
    e.preventDefault();

    const form = { uploadFile };
    //console.log(form.uploadFile)
    //if (password.length > 0) form.password = password

    const formData = new FormData();

    for (const key in form) {
      console.log(key);
      formData.append(key, form[key]);
    }
    //console.log(formData)
    dispatch(uploadToGallery(formData)).then(() => setShowGalleryModal(false));
  };

  // Hashtag code

  const removeTag = (i) => {
    const newTags = [...interestArr];
    newTags.splice(i, 1);

    // Call the defined function setTags which will replace tags with the new value.
    setInterestArr(newTags);
    setInterest(interestArr);
  };

  // Trims character from string; in this case hashtags from interests input
  function trim(str, ch) {
    var start = 0,
      end = str.length;
    while (start < end && str[start] === ch) ++start;
    while (end > start && str[end - 1] === ch) --end;
    return start > 0 || end < str.length ? str.substring(start, end) : str;
  }

  // Puts interest into array on enter press, and resets the input field. //
  const inputKeyDown = (e) => {
    // Doesn't update the displayed array correctly; appears to be one interest behind.
    //console.log('Key pressed');
    // If hashtag is input, no update it made
    if (e.target.value === "#") {
      console.log("Hashtag detected");
      return;
    }
    const val = "#" + trim(e.target.value, "#");
    console.log(`val = ${val}`);
    if (e.key === "Enter" && val !== "#") {
      if (
        interest &&
        interestArr.find(
          (interest) => interest.toLowerCase() === val.toLowerCase()
        )
      ) {
        console.log("Duplicate detected.");
        return;
      }
      console.log(val);
      setInterestArr([...interestArr, val]);
      setInterest([...interestArr, val]);
      console.log("InterestArr:");
      console.log(interestArr);
      console.log("Interest:");
      console.log(interest);
      var inputTag = document.getElementById("input-tag");
      inputTag.value = "";
    } else if (e.key === "Backspace" && val === "#") {
      removeTag(interestArr.length - 1);
    }
    console.log(interestArr);
    console.log(interest);

    return;
  };

  // End of hashtag code

  // Checkbox code
  function getSexOrientation(checkmark) {
    if (
      checked &&
      !checked.includes(
        checkmark
      ) /* && (checkmark === 'male' || checkmark === 'female' || checkmark === 'other')*/
    ) {
      checked.push(checkmark);
      if (checkmark === "female") {
        setFemale(true);
      }
      if (checkmark === "male") {
        setMale(true);
      }
      if (checkmark === "other") {
        setOther(true);
      }
    } else {
      for (var j = 0; j < checked.length; j++) {
        if (checked[j] === checkmark) {
          //console.log(`Removing ${checkmark} from array: ${checked}.`)
          checked.splice(j, 1);
          j--;
        }
        if (checkmark === "female") {
          setFemale(false);
        }
        if (checkmark === "male") {
          setMale(false);
        }
        if (checkmark === "other") {
          setOther(false);
        }
      }
    }
    //if (checkmark === 'male' ) checked.push(checkmark) LOOP!
    //if (checkmark === 'other' ) checked.push(checkmark)
    //checked.push(checkmark)
    //console.log(checked)
    setSexual_orientation(checked);
  }

  function inArray(option) {
    if (sexual_orientation.includes(option)) {
      return true;
    } else {
      return false;
    }
  }

  // End of checkbox code

  const imageDeleteButtonHandler = (img) => {
    //console.log('Image delete button clicked.')
    //console.log(`image path: ${img.path}`)
    //console.log(`image owner: ${img.owner_id}`)
    const requestObject = {
      user: user,
      image: img,
    };
    galleryService.deleteGalleryImage(requestObject).then((returnedImages) => {
      //console.log(initialImages);
      setGalleryImages(returnedImages.rows);
    });
  };

  const makeAvatarButtonHandler = (img) => {
    console.log("Image avatar button clicked.");
    console.log(`image path: ${img.path}`);
    //console.log(`image owner: ${img.owner_id}`)
    const requestObject = {
      user: user,
      image: img,
    };
    galleryService.makeAvatarImage(requestObject);
    /*.then(returnedImages => {
        //console.log(initialImages);
        setAvatar(returnedImages.rows[0].path)
      })*/
  };

  const galleryImagesToShow = galleryImages
    ? galleryImages.map((image, index) => {
        if (image.path === user.avatar) {
          return (
            <div
              key={`${image.path}_container`}
              className="gallery-image-container"
            >
              <img
                /*className="gallery-image"*/ width="25%"
                height="25%"
                src={`http://localhost:5000/uploads/user/${user.user_id}/${image.path}`}
                alt={`${image.path}`}
                key={`${image.path}`}
              />
              <button
                title="Delete image"
                className="delete-btn"
                key={`${image.path}_deleteButton`}
                onClick={() => imageDeleteButtonHandler(image)}
              >
                X
              </button>
            </div>
          );
        }
        return (
          <div
            key={`${image.path}_container`}
            className="gallery-image-container"
          >
            <img
              /*className="gallery-image"*/ width="25%"
              height="25%"
              src={`http://localhost:5000/uploads/user/${user.user_id}/${image.path}`}
              alt={`${image.path}`}
              key={`${image.path}`}
            />
            <button
              className="delete-btn"
              key={`${image.path}_deleteButton`}
              onClick={() => imageDeleteButtonHandler(image)}
            >
              X
            </button>
            <button
              title="Make avatar"
              className="avatar-btn"
              key={`${image.path}_avatarButton`}
              onClick={() => makeAvatarButtonHandler(image)}
            >
              *
            </button>
          </div>
        );
      })
    : null;

  const conversationsToShow = partnersArr
    ? partnersArr.map((conversation, index) => {
        return (
          <div key={index}>
            <img
              className="avatar"
              width="40"
              height="40"
              src={`http://localhost:5000/uploads/user/${conversation.partner_id}/${conversation.avatar}`}
              alt="partner-avatar"
            />
            <p>{conversation.name}</p>
            <p>
              Link:{" "}
              <a
                href={`http://localhost:3000/conversations/${conversation.conversation}`}
              >
                link
              </a>
            </p>
            <p>
              Recent message:{" "}
              {conversation.recentMessageObj[0].mostRecentMessage}
            </p>
          </div>
        );
        // Make useState variable to store an array of conversation partners (name, avatar, latest message)!!!
      })
    : null;

  const galleryImagePicker =
    galleryImages && galleryImages.length < 5 ? (
      <form>
        <div className="input-field mb-2">
          <label htmlFor="gallery-upload-input">Upload image to gallery:</label>
          <input
            onChange={(e) => setUploadFile(e.target.files[0])}
            type="file"
            name="gallery-upload-input"
            id="gallery-upload-input"
            accept="image/*"
          />
        </div>
      </form>
    ) : (
      <p className="delete-img-msg">
        5 images in gallery; delete at least one to make space!
      </p>
    );

  const avatarImagePicker =
    galleryImages.length < 5 ? (
      <div className="input-field mb-2">
        <label htmlFor="avatar">Profile picture:</label>
        <input
          onChange={(e) => setUploadAvatar(e.target.files[0])}
          type="file"
          id="avatar"
          name="avatar"
        />
      </div>
    ) : (
      <div className="input-field mb-2">
        <label htmlFor="avatar">Profile picture:</label>
        <p className="delete-img-msg" id="avatar" name="avatar">
          5 images in gallery; delete at least one to make space!
        </p>
      </div>
    );

  // Start of logout function
  function logOut() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.user_id }),
    };

    fetch("http://localhost:5000/logout", requestOptions);
    /*.then(response =>{
      console.log('Response: ')
      console.log(response)}
    )*/
    dispatch(logout());
  }

  return (
    <div id="navbar" className="card-shadow">
      <a href="http://localhost:3000">
        <img width="100" height="80" src={logoImage} alt="Logo" />
      </a>

      <div id="chat-menu">
        <a className="user-name" href="http://localhost:3000/matches">
          Find match
        </a>
      </div>

      <div onClick={() => setShowChatOptions(!showChatOptions)} id="chat-menu">
        <p className="user-name">Chat</p>
        <FontAwesomeIcon icon="caret-down" className="fa-icon" size="lg" />

        <i class="fa-github-square fa-brands"></i>
        {showChatOptions && <div id="chat-options">{conversationsToShow}</div>}
      </div>

      <div
        onClick={() => setShowProfileOptions(!showProfileOptions)}
        id="profile-menu"
      >
        <img
          className="avatar"
          width="40"
          height="40"
          src={`http://localhost:5000/uploads/user/${user.user_id}/${avatar}`}
          alt="Avatar"
        />
        <p className="user-name">{user.user_name}</p>
        <FontAwesomeIcon icon="caret-down" className="fa-icon" />

        {showProfileOptions && (
          <div id="profile-options">
            <p onClick={() => setShowProfileModal(true)}>Update profile</p>
            <p onClick={() => setShowGalleryModal(true)}>Image gallery</p>
          </div>
        )}
        {/* 
        <div id="profile-menu">
          <p onClick={() => logOut()}>Logout</p>
        </div> */}

        {showProfileModal && (
          <Modal click={() => setShowProfileModal(false)}>
            <Fragment key="header">
              <h3 className="m-0">Update profile</h3>
            </Fragment>

            <Fragment key="body">
              <form>
                <div className="input-field mb-1">
                  <input
                    onChange={(e) => setFirst_name(e.target.value)}
                    value={first_name}
                    required="required"
                    type="text"
                    placeholder="First name"
                  />
                </div>

                <div className="input-field mb-1">
                  <input
                    onChange={(e) => setLast_name(e.target.value)}
                    value={last_name}
                    required="required"
                    type="text"
                    placeholder="Last name"
                  />
                </div>

                <div className="input-field mb-1">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required="required"
                    type="text"
                    placeholder="Email"
                  />
                </div>

                <div className="input-field mb-1">
                  <h3>I am ...</h3>
                  <select
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                    required="required"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Other</option>
                  </select>
                </div>

                {/* //! TODO need to add all the needed field and connect the updated data with database */}

                <div className="input-field mb-1">
                  <h3>Looking for...</h3>
                  <label htmlFor="sex-or-male">Male</label>
                  <input
                    type="checkbox"
                    value="male"
                    id="sex-or-male"
                    name="sex-or-male"
                    checked={male}
                    onChange={(e) => getSexOrientation(e.target.value)}
                  />
                  <label htmlFor="sex-or-female">Female</label>
                  <input
                    type="checkbox"
                    value="female"
                    id="sex-or-female"
                    name="sex-or-female"
                    checked={female}
                    onChange={(e) => getSexOrientation(e.target.value)}
                  />
                  <label htmlFor="sex-or-other">Other</label>
                  <input
                    type="checkbox"
                    value="other"
                    id="sex-or-other"
                    name="sex-or-other"
                    checked={other}
                    onChange={(e) => getSexOrientation(e.target.value)}
                  />
                </div>

                <div className="input-field mb-1">
                  <input
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                    // required='required'
                    type="text"
                    placeholder="Bio"
                    autoComplete="off"
                  />
                </div>

                {/* //! TODO end of newly added code */}

                <div className="input-field mb-2">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required="required"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                </div>
                <div className="input-field mb-2">
                  <label htmlFor="birthdate">Birthdate:</label>
                  <input
                    type="date"
                    id="birthdate"
                    onChange={(e) => setBirthdate(e.target.value)}
                    name="birthdate"
                    value={birthdate}
                  ></input>
                </div>
                {avatarImagePicker}
                <div className="input-tag">
                  <ul className="input-tag__tags">
                    {interest &&
                      interest.map(
                        (
                          tag,
                          i // ALWAYS DO THIS!
                        ) => (
                          <li key={tag}>
                            {tag}
                            <button
                              type="button"
                              onClick={() => {
                                removeTag(i);
                              }}
                            >
                              +
                            </button>
                          </li>
                        )
                      )}
                    <li className="input-tag__tags__input">
                      <input
                        id="input-tag"
                        type="text"
                        onKeyDown={inputKeyDown}
                        placeholder="Interests (write one at a time and press enter...)" /*ref={c => { tagInput = c; }}*/
                      />
                    </li>
                  </ul>
                </div>
              </form>
            </Fragment>

            <Fragment key="footer">
              <button className="btn-success" onClick={submitForm}>
                UPDATE
              </button>
            </Fragment>
          </Modal>
        )}
        {showGalleryModal && (
          <GalleryModal click={() => setShowGalleryModal(false)}>
            <img
              width="40"
              height="40"
              src={`http://localhost:5000/uploads/user/${user.user_id}/${avatar}`}
              alt="Avatar"
            />
            <Fragment key="gallery-header">
              <h3 className="m-0">Image Gallery</h3>
            </Fragment>

            <Fragment key="gallery-images">
              {galleryImagesToShow}
              {galleryImagePicker}
            </Fragment>
            <Fragment key="gallery-footer">
              <button className="btn-success" onClick={submitGalleryForm}>
                Upload
              </button>
            </Fragment>
          </GalleryModal>
        )}
      </div>

      <div id="profile-menu">
        <p onClick={() => logOut()}>Logout</p>
      </div>
    </div>
  );
};

export default Navbar;
