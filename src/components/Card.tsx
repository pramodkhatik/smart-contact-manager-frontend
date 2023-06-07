import { useEffect, useReducer, useState } from "react";
import "./Card.css";
import axios from "axios";
import { getCurrentUser, getToken } from "../auth";
import Dropdown from "./DropDown";

interface MyCardProp {
  searchValue: string;
}
const MyCard: React.FC<MyCardProp> = ({ searchValue }) => {
  const [contacts, setContacts] = useState([]);
  // const [selectContact, setSelectedContact] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  const getImage = (contact: any) => {
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
        setContacts(result.data);
        setFilteredContacts(result.data);
      })
      .catch((error) => console.log("Error fetching contacts:", error));
  }, []);
  // console.log(contacts);

  useEffect(() => {
    const filteredResults = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredContacts(filteredResults);
  }, [searchValue, contacts]);

  // useEffect(() => console.log(selectContact));

  console.log(filteredContacts);
  return (
    <div className="card-container">
      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact, i) => (
          <div
            className="cards"
            key={contact.id}
            style={{ width: "430px", height: "200px", marginLeft: "1px" }}
          >
            <div className="card-body">
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
                  <Dropdown contactData={contact} />
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
                    {contact.countryExtension}{" "}{contact.phone}
                  </h6>
                </div>
              </div>
            </div>
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
