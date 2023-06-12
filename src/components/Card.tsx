import { useEffect, useState } from "react";
import "./Card.css";
import axios from "axios";
import { getCurrentUser, getToken } from "../auth";
import Dropdown from "./DropDown";

interface MyCardProp {
  searchValue: string;
}

interface Contact {
  [x: string]: any;
  contactId: string;
  name: string;
  image: string;
  work: string;
  email: string;
  countryExtension: string;
  phone: string;
}

const MyCard: React.FC<MyCardProp> = ({ searchValue }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  const openDetails = (contactId: string) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.contactId === contactId
          ? { ...contact, showDetails: true }
          : contact
      )
    );
  };

  const closeDetails = (contactId: string) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.contactId === contactId
          ? { ...contact, showDetails: false }
          : contact
      )
    );
  };

  const getImage = (contact: Contact) => {
    let contactImage = window.location.origin + "/default.png";
    if (contact.image != null && contact.image != "")
      contactImage =
        "http://localhost:8081/api/contacts/image/" + contact.contactId;
    return contactImage;
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/contacts/users/" + getCurrentUser().id, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((result) => {
        const fetchedContacts = result.data.map((contact: Contact) => ({
          ...contact,
          showDetails: false, // Initialize the showDetails property to false for each contact
        }));
        setContacts(fetchedContacts);
        setFilteredContacts(fetchedContacts);
      })
      .catch((error) => console.log("Error fetching contacts:", error));
  }, []);

  useEffect(() => {
    const filteredResults = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredContacts(filteredResults);
  }, [searchValue, contacts]);

  const getNikckName = (_nickName: string) => {
    if (_nickName == "") return "";
    else return "(" + _nickName + ")";
  };

  return (
    <div className="card-container">
      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact) => (
          <div
            className="cards"
            key={contact.contactId}
            style={{ width: "430px", height: "190px", marginLeft: "0.5px" }}
          >
            <div
              className="card-body"
              onClick={() => openDetails(contact.contactId)}
            >
              <div className="row">
                <div className="col-5">
                  <div className="image-content">
                    <img
                      src={getImage(contact)}
                      className="rounded-circle "
                      alt="User Avatar"
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                </div>
                <div
                  className="col-6"
                  style={{
                    textAlign: "left",
                    marginLeft: "20px",
                    paddingTop: "15px",
                  }}
                >
                  <div>
                    <h6 style={{ paddingBottom: "5px", fontWeight: "bold" }}>
                      {" "}
                      <i className="fa fa-user-o" aria-hidden="true"></i>{" "}
                      {contact.name}
                    </h6>

                    <h6 style={{ paddingBottom: "5px" }}>
                      {" "}
                      <i className="fa fa-id-badge" aria-hidden="true"></i>{" "}
                      {contact.work}
                    </h6>

                    <h6 style={{ paddingBottom: "5px" }}>
                      {" "}
                      <i className="fa fa-envelope" aria-hidden="true"></i>{" "}
                      {contact.email}
                    </h6>

                    <h6 style={{ paddingBottom: "5px" }}>
                      {" "}
                      <i className="fa fa-phone" aria-hidden="true"></i>{" "}
                      {contact.countryExtension} {contact.phone}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            {contact.showDetails && (
              <>
                <div className="details-modal">
                  <div className="details-box">
                    <div className="row">
                      <div className="col">
                        <img
                          src={getImage(contact)}
                          style={{ height: "200px" }}
                          alt="User Avatar"
                        />
                      </div>
                      <div className="col">
                        <div style={{ marginBottom: "1rem" }}>
                          <Dropdown contactData={contact} />
                        </div>
                        {/* <div
                          style={{ position: "fixed", marginBottom: "5rem" }}
                          onClick={() => closeDetails(contact.contactId)}
                        >
                          <i
                            className="fa fa-times"
                            style={{
                              marginLeft: "15rem",
                              // marginBottom: "5rem",
                              position: "fixed",
                            }}
                          />
                        </div> */}
                        <div style={{ marginTop: "3rem" }}>
                          <h5>
                            {contact.name} {getNikckName(contact.secondName)}
                          </h5>
                          <p style={{ fontWeight: "bold" }}>
                            {contact.designation}
                          </p>
                          {contact.countryExtension} {contact.phone}
                          <br />
                          {contact.email}
                          <br />
                          {contact.work}
                          <br />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">{contact.description}</div>
                    </div>
                    <div style={{ marginLeft: "30rem" }}>
                      <button
                        className="btn btn-secondary"
                        onClick={() => closeDetails(contact.contactId)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="msg-center" style={{ color: "red", fontSize: "25px" }}>
          No Contacts Found
        </p>
      )}
    </div>
  );
};

export default MyCard;
