import useTitle from "../hooks/useTitle";
import { useEffect, useState } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
import {
  createVocabulariesList,
  deleteVocabulariesList,
  fetchSubscribedVocabulariesLists,
  fetchUserVocabulariesLists,
} from "../api/vocabulariesList";
import ErrorModal from "../components/ErrorModal";
import {
  subscribeToVocabularyList,
  unsubscribeFromVocabularyList,
} from "../api/subscribedList";
import { useNavigate } from "react-router-dom";

function MyLists() {
  useTitle("My Lists");

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [vocabulariesLists, setVocabulariesLists] = useState<
    { name: string; id: number; shareId: string }[]
  >([]);
  const [newSubscribedListId, setNewSubscribedListId] = useState("");
  const [subscribedLists, setSubscribedLists] = useState<
    { name: string; id: number }[]
  >([]);

  const userVocabulariesLists = async () => {
    try {
      const userVocabulariesLists = await fetchUserVocabulariesLists();
      const vocabulariesLists = userVocabulariesLists.$values;

      if (vocabulariesLists.length === 0) {
        return;
      }

      const newLists = vocabulariesLists.map((vocabularyList) => ({
        name: vocabularyList.name,
        id: vocabularyList.id,
        shareId: vocabularyList.shareId,
      }));
      setVocabulariesLists(newLists);
    } catch {
      setError("Failed to fetch user vocabularies lists.");
      setShowError(true);
    }
  };

  const userSubscribedVocabulariesLists = async () => {
    try {
      const userSubscribedVocabulariesLists =
        await fetchSubscribedVocabulariesLists();
      const vocabulariesLists = userSubscribedVocabulariesLists.$values;

      if (vocabulariesLists.length === 0) {
        return;
      }

      const newLists = vocabulariesLists.map((vocabularyList) => ({
        name: vocabularyList.name,
        id: vocabularyList.id,
        shareId: vocabularyList.shareId,
      }));
      setSubscribedLists(newLists);
    } catch {
      setError("Failed to fetch user subscribed vocabularies lists.");
      setShowError(true);
    }
  };

  const handleCreate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!newListName.trim()) {
      setError("List name cannot be empty.");
      setShowError(true);
      return;
    }

    const newVocabulariesList = await createVocabulariesList(newListName);
    setVocabulariesLists([
      ...vocabulariesLists,
      {
        name: newVocabulariesList.name,
        id: newVocabulariesList.id,
        shareId: newVocabulariesList.shareId,
      },
    ]);

    setNewListName("");
  };

  const handleSubscribe = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!newSubscribedListId.trim()) {
      setError("List Share ID cannot be empty.");
      setShowError(true);
      return;
    }

    const newSubscribedList = await subscribeToVocabularyList(
      newSubscribedListId
    );

    if (newSubscribedList == null) {
      setError("You don't have permission to subscribe to this list.");
      setShowError(true);
      return;
    }

    setSubscribedLists([
      ...subscribedLists,
      {
        name: newSubscribedList.name ?? "",
        id: newSubscribedList.id ?? 0,
      },
    ]);

    setNewSubscribedListId("");
  };

  const handleDelete = async (id: number) => {
    const success = await deleteVocabulariesList(id);
    if (!success) {
      setError("Failed to delete vocabularies list.");
      setShowError(true);
      return;
    }

    setVocabulariesLists(vocabulariesLists.filter((list) => list.id !== id));
  };

  const handleUnsubscribe = async (id: number) => {
    const success = await unsubscribeFromVocabularyList(id);
    if (!success) {
      setError("Failed to unsubscribe from vocabularies list.");
      setShowError(true);
      return;
    }

    setSubscribedLists(subscribedLists.filter((list) => list.id !== id));
  };

  const handleEdit = (id: number) => {
    navigate("/edit", {
      state: {
        id: id,
      },
    });
  };

  useEffect(() => {
    userVocabulariesLists();
    userSubscribedVocabulariesLists();
  }, []);
  return (
    <>
      <ErrorModal
        show={showError}
        onHide={() => setShowError(false)}
        title="Error"
        message={error}
      />
      <Container className="mt-5">
        <h2>My Lists</h2>
        <Form className="my-3 d-flex">
          <Form.Control
            type="text"
            placeholder="Type Your New List Name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <Button className="ms-2" onClick={handleCreate}>
            Create
          </Button>
        </Form>
        <hr />

        {vocabulariesLists.map((list) => (
          <Card className="p-3 m-2" key={list.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className="mb-2">
                  <strong>{list.name}</strong>
                </Card.Title>
                <Card.Text>
                  Share Your List: <strong>{list.shareId}</strong>
                </Card.Text>
              </div>
              <div>
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() => handleEdit(list.id)}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(list.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}

        <br />

        <h2>Subscribed Lists</h2>
        <Form className="my-3 d-flex">
          <Form.Control
            type="text"
            placeholder="Type List Share ID to Subscribe"
            value={newSubscribedListId}
            onChange={(e) => setNewSubscribedListId(e.target.value)}
          />
          <Button className="ms-2" onClick={handleSubscribe}>
            Subscribe
          </Button>
        </Form>
        <hr />

        {subscribedLists.map((list) => (
          <Card className="p-3 m-2" key={list.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className="mb-2">
                  <strong>{list.name}</strong>
                </Card.Title>
              </div>
              <div>
                <Button
                  variant="danger"
                  onClick={() => handleUnsubscribe(list.id)}
                >
                  Unsubscribe
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default MyLists;
