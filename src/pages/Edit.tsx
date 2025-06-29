import { useLocation } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import type { VocabulariesList } from "../types/vocabulariesList";
import { fetchVocabulariesListWithId } from "../api/vocabulariesList";
import ErrorModal from "../components/ErrorModal";
import type { Vocabulary } from "../types/vocabulary";
import {
  addVocabulary,
  removeVocabularyInVocabulariesList,
  searchWord,
} from "../api/vocabulary";

function Edit() {
  useTitle("Edit");

  const location = useLocation();
  const { id } = location.state || {};
  const [vocabulariesList, setVocabulariesList] =
    useState<VocabulariesList | null>(null);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [searchResult, setSearchResult] = useState<Vocabulary[]>([]);

  const getVocabulariesListWithVocabularies = async () => {
    try {
      const vocabulariesList = await fetchVocabulariesListWithId(id);
      setVocabulariesList(vocabulariesList);
      setVocabularies(vocabulariesList.vocabularies.$values || []);
    } catch (err) {
      setError((err as Error).message);
      setShowError(true);
      console.error(err);
    }
  };

  const handleRemove = async (vocabularyId: number) => {
    const success = await removeVocabularyInVocabulariesList(id, vocabularyId);
    if (!success) {
      setError("Failed to delete vocabularies list.");
      setShowError(true);
      return;
    }

    setVocabularies(vocabularies.filter((v) => v.id !== vocabularyId));
  };

  const handleSearch = async () => {
    const result = await searchWord(searchText, id);
    setSearchResult(result.$values);
  };

  const handleAdd = async (vocabularyId: number) => {
    const response = await addVocabulary(id, vocabularyId);
    if (response == null) {
      setError("Failed to add vocabularies list.");
      setShowError(true);
      return;
    }

    setSearchResult(searchResult.filter((v) => v.id !== vocabularyId));
    setVocabularies([...vocabularies, { ...response }]);
  };

  useEffect(() => {
    getVocabulariesListWithVocabularies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ErrorModal
        show={showError}
        onHide={() => setShowError(false)}
        title="Error"
        message={error}
      />
      <Container className="mt-4 g-4">
        <h2>Edit - {vocabulariesList?.name}</h2>
        <hr />
        <Row className="mt-4">
          {/* Left Column */}
          <Col md={6}>
            <Card
              className="h-100 p-4"
              style={{ maxHeight: "75vh", overflowY: "auto" }}
            >
              <h4>Added Vocabularies</h4>
              {vocabularies.map((vocabulary) => (
                <Card key={vocabulary.id} className="mb-3">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{vocabulary.word}</strong>
                      <p>
                        <strong>Description:</strong> {vocabulary.description}
                      </p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="danger"
                        onClick={() => handleRemove(vocabulary.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Card>
          </Col>

          {/* Right Column */}
          <Col md={6}>
            <Card
              className="h-100 p-4"
              style={{ maxHeight: "75vh", overflowY: "auto" }}
            >
              <h4>Search</h4>
              <Form
                className="d-flex mb-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                <Form.Control
                  type="text"
                  placeholder=""
                  className="me-2"
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Button variant="primary" onClick={handleSearch}>
                  Search
                </Button>
              </Form>

              {searchResult.map((vocabulary) => (
                <Card key={vocabulary.id} className="mb-3">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{vocabulary.word}</strong>
                      <p>
                        <strong>Description:</strong> {vocabulary.description}
                      </p>
                    </div>
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="success"
                        onClick={() => handleAdd(vocabulary.id)}
                      >
                        Add
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Edit;
