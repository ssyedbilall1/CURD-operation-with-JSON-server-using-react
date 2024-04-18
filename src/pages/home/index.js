import React, { useState, useEffect } from "react";
//@import styles
import styles from "./index.module.scss";
//@import modal component
import Modal from "../modal/index";
//@import button component
import Button from "../../component/button";
//@import react icons
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
//@import react toast
import { toast } from "react-toastify";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:8000/inputData")
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.log("Failed: " + err.message));
      setTimeout(fetchData, 2000);
    };

    fetchData();
  }, []);

  const handleButtonClick = () => {
    setModalOpen(false);
  };

  const deleteItem = (id) => {
    fetch(`http://localhost:8000/inputData/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setData(data.filter((item) => item.id !== id));
          setShowDeleteWarning(false);
          toast.success("Item deleted successfully");
        } else {
          throw new Error("Failed to delete item from server");
        }
      })
      .catch((err) => console.log("Failed: " + err.message));
  };

  const showDeleteConfirmation = (id) => {
    setDeleteId(id);
    setShowDeleteWarning(true);
  };

  return (
    <>
      <div className={styles.homeWrapper}>
        <div className={styles.dataWrapper}>
          {data.length > 0 ? (
            <div className={styles.box}>
              {data.map((item) => (
                <div key={item.id}>
                  {item.type === "table" ? (
                    <div className={styles.tableBox}>
                      <table>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Current Value</th>
                            <th>Total Value</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.type}</td>
                            <td>{item.currentValue}</td>
                            <td>{item.totalValue}</td>
                            <td>
                              <MdDelete
                                onClick={() => showDeleteConfirmation(item.id)}
                                className={styles.deleteIcon}
                              />
                              <FaRegEdit
                                onClick={() => {
                                  setEditItemId(item.id);
                                  setModalOpen(true);
                                }}
                                className={styles.editIcon}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : item.type === "chart" ? (
                    <div className={styles.chartContainer}>
                      <span className={styles.currentValue}>
                        CV: {item.currentValue}
                      </span>
                      <span className={styles.totalValue}>
                        TV: {item.totalValue}
                      </span>
                      <div className={styles.chartFooter}>
                        <span className={styles.type}>ID: {item.id}</span>
                        <span className={styles.name}>Name: {item.name}</span>
                        <span className={styles.type}>Type: {item.type}</span>
                        <MdDelete
                          onClick={() => showDeleteConfirmation(item.id)}
                          className={styles.deleteIcon}
                        />
                        <FaRegEdit
                          onClick={() => {
                            setEditItemId(item.id);
                            setModalOpen(true);
                          }}
                          className={styles.editIcon}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            "No data found"
          )}
        </div>
        <div className={styles.btnWrapper}>
          <Button onClick={() => setModalOpen(true)}>Add Data</Button>
          {modalOpen && (
            <Modal onClose={handleButtonClick} itemId={editItemId}></Modal>
          )}
          {showDeleteWarning && (
            <div className={styles.modalContainer}>
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <p>Are you sure you want to delete this item?</p>

                  <Button
                    className={styles.btnspace}
                    onClick={() => deleteItem(deleteId)}
                  >
                    Yes
                  </Button>
                  <Button onClick={() => setShowDeleteWarning(false)}>
                    No
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
