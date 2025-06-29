import useTitle from "../hooks/useTitle";
import { Container, Row, Col, Dropdown, Button, Table } from "react-bootstrap";
import { fetchVocabularyRandom } from "../api/vocabulary";
import {
  fetchPublicVocabulariesLists,
  fetchUserVocabulariesLists,
  fetchSubscribedVocabulariesLists,
} from "../api/vocabulariesList";
import { useEffect, useState } from "react";
import type { Vocabulary } from "../types/vocabulary";
import type { VocabulariesLists } from "../types/vocabulariesList";
import ErrorModal from "../components/ErrorModal";

function Home() {
  useTitle("Home");

  const accessToken = localStorage.getItem("token");

  const [selectedList, setSelectedList] = useState("Choose Vocabularies List");
  const [vocabulary, setVocabulary] = useState<Vocabulary[]>();
  const [publicVocabulariesLists, setPublicVocabulariesLists] =
    useState<VocabulariesLists>();
  const [userVocabulariesLists, setUserVocabulariesLists] =
    useState<VocabulariesLists>();
  const [subscribedVocabulariesLists, setSubscribedVocabulariesLists] =
    useState<VocabulariesLists>();
  const [vocabulariesListId, setvocabulariesListId] = useState<number>(0);

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const loadVocabulary = async (vocabulariesListId: number) => {
    const data = await fetchVocabularyRandom(vocabulariesListId);
    if (data === undefined || Object.keys(data).length === 0) {
      setError(`No vocabulary found for the selected list. ${selectedList}`);
      setShowError(true);
      return;
    }
    setVocabulary([data]);
  };

  const loadVocabulariesList = async (token: string) => {
    const data = await fetchPublicVocabulariesLists();
    setPublicVocabulariesLists(data);
    if (token !== null) {
      const userData = await fetchUserVocabulariesLists();
      setUserVocabulariesLists(userData);

      const subscribedData = await fetchSubscribedVocabulariesLists();
      setSubscribedVocabulariesLists(subscribedData);
    }
  };

  useEffect(() => {
    loadVocabulary(vocabulariesListId);
    loadVocabulariesList(accessToken!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vocabulariesListId, accessToken]);

  const handleListSelect = (listName: string) => {
    setSelectedList(listName);
  };

  return (
    <>
      <ErrorModal
        show={showError}
        onHide={() => setShowError(false)}
        title="Error"
        message={error}
      />
      <Container className="mt-5">
        <Row className="mb-4 align-items-center">
          <Col xs={12} md={6}>
            <Dropdown onSelect={(eventKey) => handleListSelect(eventKey || "")}>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {selectedList}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ maxHeight: "300px", overflowY: "auto" }}>
                <Dropdown.Header className="font-weight-bold">
                  DEFAULT VOCABULARIES LISTS
                </Dropdown.Header>
                <Dropdown.Item
                  key={0}
                  eventKey={"Default Words List"}
                  active={"Default Words List" === selectedList}
                  onClick={() => {
                    setvocabulariesListId(0);
                  }}
                >
                  Default Words List
                </Dropdown.Item>
                {publicVocabulariesLists?.$values?.map((vl) => (
                  <Dropdown.Item
                    key={vl.id}
                    eventKey={vl.name}
                    active={vl.name === selectedList}
                    onClick={() => {
                      setvocabulariesListId(vl.id);
                    }}
                  >
                    {vl.name}
                  </Dropdown.Item>
                ))}
                <Dropdown.Divider />

                <Dropdown.Header className="font-weight-bold">
                  MY VOCABULARIES LISTS
                </Dropdown.Header>
                {accessToken !== null &&
                  userVocabulariesLists?.$values?.map((vl) => (
                    <Dropdown.Item
                      key={vl.id}
                      eventKey={vl.name}
                      active={vl.name === selectedList}
                      onClick={() => {
                        setvocabulariesListId(vl.id);
                      }}
                    >
                      {vl.name}
                    </Dropdown.Item>
                  ))}
                <Dropdown.Divider />

                <Dropdown.Header className="font-weight-bold">
                  SUBSCRIBED VOCABULARIES LISTS
                </Dropdown.Header>

                {accessToken !== null &&
                  subscribedVocabulariesLists?.$values?.map((vl) => (
                    <Dropdown.Item
                      key={vl.id}
                      eventKey={vl.name}
                      active={vl.name === selectedList}
                      onClick={() => {
                        setvocabulariesListId(vl.id);
                      }}
                    >
                      {vl.name}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xs={12} md={6} className="text-md-end mt-3 mt-md-0">
            <Button
              variant="primary"
              onClick={() => loadVocabulary(vocabulariesListId)}
            >
              Next Vocabulary
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            {vocabulary?.map((v) => (
              <Table bordered responsive hover key={v.id}>
                <tbody>
                  <tr>
                    <td
                      className="fw-semibold bg-light"
                      style={{ width: "150px" }}
                    >
                      Word
                    </td>
                    <td>{v.word}</td>
                  </tr>
                  <tr>
                    <td className="fw-semibold bg-light">Type</td>
                    <td>{v.type}</td>
                  </tr>
                  <tr>
                    <td className="fw-semibold bg-light">Description</td>
                    <td>{v.description}</td>
                  </tr>
                  <tr>
                    <td className="fw-semibold bg-light">Example</td>
                    <td>
                      {v.example != null ? (
                        v.example
                      ) : (
                        <span className="text-muted">No example</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-semibold bg-light align-top">Synonyms</td>
                    <td>
                      {v.synonyms.$values.length > 0 ? (
                        v.synonyms.$values
                          .map((syn) => syn.words.$values.join(" | "))
                          .map((synonyms, index) => (
                            <span key={index}>
                              {synonyms}
                              <br />
                            </span>
                          ))
                      ) : (
                        <span className="text-muted">No synonyms</span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
