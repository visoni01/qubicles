import React from "react";
import { Button, TextField, Divider } from "@material-ui/core";

const shareModal = () => {
  return (
    <>
      <div className="shareModal-email-div">
        <Button
          variant="contained"
          color="primary"
          className="sharemodal-buttons"
        >
          Invite Gmail Contacts
        </Button>
        <span className="shareModal-span">Or</span>
        <div className="shareModal-add-email">
          <TextField
            id="outlined-password-input"
            label="Add Email"
            type="text"
            variant="outlined"
            size="small"
            className="shareModal-add-email-textbox"
          />
          <span className="shareModal-add-email-span">
            Separate emails with commas
          </span>
        </div>
        <Button
          variant="contained"
          color="primary"
          className="sharemodal-buttons"
        >
          Send
        </Button>
      </div>
      <Divider className="shareModal-divider" />
      <div className="shareModal-email-div">
        <div>
          <h4>Your Invite Link</h4>
          <div>
            <TextField
              id="outlined-password-input"
              type="text"
              variant="outlined"
              size="small"
              value="invite link"
              InputProps={{
                readOnly: true,
              }}
            />
            <Button variant="contained" color="primary" className="sharemodal-buttons">
              Send
            </Button>
          </div>
        </div>
        <div className="shareModal-invite-link">
          <h4>Share Via Social</h4>
          <div>
            <Button variant="contained" color="primary" className="sharemodal-buttons shareModal-invite-fb" >
              Send
            </Button>
            <Button variant="contained" color="primary" className="sharemodal-buttons">
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default shareModal;
