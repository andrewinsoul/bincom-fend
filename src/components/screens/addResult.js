import { useCallback, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TextField } from "../common/input";
import { Text } from "../common/text";
import Api from "../../utils/service";

export const AddResult = () => {
  const [formField, setFormField] = useState({
    partyAbbrev: "",
    partyScore: "",
    name: "",
  });

  const [loading, setLoading] = useState(false);

  const [formFieldTouched, setFormFieldTouched] = useState({
    partyAbbrev: "",
    partyScore: "",
    name: "",
  });
  const [formFieldError, setFormFieldError] = useState({
    partyAbbrev: "",
    partyScore: "",
    name: "",
  });

  const navigate = useNavigate();
  const { pollUnitId } = useParams();
  const { state: pollingUnitName } = useLocation();

  const validate = useCallback(
    (fields, submitted) => {
      const { partyAbbrev, partyScore, name } = fields;
      if (submitted) {
        if (!partyAbbrev) {
          setFormFieldError((prev) => ({
            ...prev,
            partyAbbrev: "please enter the name of the political party",
          }));
        } else {
          if (partyAbbrev.length > 4) {
            setFormFieldError((prev) => ({
              ...prev,
              partyAbbrev: "Enter the acronym of the party e.g PDP",
            }));
          } else {
            setFormFieldError((prev) => ({
              ...prev,
              partyAbbrev: "",
            }));
          }
        }
        if (!partyScore) {
          setFormFieldError((prev) => ({
            ...prev,
            partyScore: "please enter the score of the political party",
          }));
        } else {
          if (isNaN(partyScore)) {
            setFormFieldError((prev) => ({
              ...prev,
              partyScore: "Party score must be a number",
            }));
          } else {
            setFormFieldError((prev) => ({
              ...prev,
              partyScore: "",
            }));
          }
        }
        if (!name) {
          setFormFieldError((prev) => ({
            ...prev,
            name: "please enter your name",
          }));
        } else {
          setFormFieldError((prev) => ({
            ...prev,
            name: "",
          }));
        }
      } else {
        if (formFieldTouched.partyAbbrev) {
          if (!partyAbbrev) {
            setFormFieldError((prev) => ({
              ...prev,
              partyAbbrev: "please enter the name of the political party",
            }));
          } else {
            if (partyAbbrev.length > 4) {
              setFormFieldError((prev) => ({
                ...prev,
                partyAbbrev: "Enter the acronym of the party e.g PDP",
              }));
            } else {
              setFormFieldError((prev) => ({
                ...prev,
                partyAbbrev: "",
              }));
            }
          }
        }

        if (formFieldTouched.partyScore) {
          if (!partyScore) {
            setFormFieldError((prev) => ({
              ...prev,
              partyScore: "please enter the score of the political party",
            }));
          } else {
            if (isNaN(partyScore)) {
              setFormFieldError((prev) => ({
                ...prev,
                partyScore: "Party score must be a number",
              }));
            } else {
              setFormFieldError((prev) => ({
                ...prev,
                partyScore: "",
              }));
            }
          }
        }

        if (formFieldTouched.name) {
          if (!name) {
            setFormFieldError((prev) => ({
              ...prev,
              name: "please enter your name",
            }));
          } else {
            setFormFieldError((prev) => ({
              ...prev,
              name: "",
            }));
          }
        }
      }
      if (partyAbbrev && partyScore && name) {
        return true;
      } else {
        return false;
      }
    },
    [formFieldTouched]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    validate({ ...formField, [name]: value });
    setFormField((prevFormField) => ({
      ...prevFormField,
      [name]: value,
    }));
  };

  const handleFocus = useCallback(
    (event) => {
      const { name } = event.target;
      if (!formFieldTouched[name]) {
        setFormFieldTouched((prevFormField) => ({
          ...prevFormField,
          [name]: true,
        }));
      }
      validate(formField);
    },
    [formFieldTouched, formField, validate]
  );

  const handleSubmit = (values) => async () => {
    try {
      setLoading(true);
      const isFormValid = validate(values, true);
      if (isFormValid) {
        const res = await Api.post("/add/party/result/pollingUnit", {
          pollingUnitId: pollUnitId,
          partyAbbrev: formField.partyAbbrev,
          partyScore: formField.partyScore,
          user: formField.name,
        });
        navigate(-1);
      }
    } catch (error) {
      alert(error.message || "An error occured");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex column shadow p-60 column md-rounded"
      >
        <Text>{`Add Result for ${pollingUnitName}`}</Text>
        <TextField
          handleFocus={handleFocus}
          name="partyAbbrev"
          className={`mb-1 no-outline p-8 md-rounded ${
            formFieldError.partyAbbrev
              ? "red-border-color"
              : "gray-border-color"
          }`}
          handleChange={handleChange}
          value={formField.partyAbbrev}
          placeholder="Party Name"
          label="Enter Name of Political Party"
          helperText={formFieldError.partyAbbrev}
        />
        <TextField
          handleFocus={handleFocus}
          name="partyScore"
          className={`mb-1 no-outline p-8 md-rounded ${
            formFieldError.partyScore ? "red-border-color" : "gray-border-color"
          }`}
          handleChange={handleChange}
          value={formField.partyScore}
          placeholder="Party Score"
          label="Enter Score of Political Party"
          helperText={formFieldError.partyScore}
        />
        <TextField
          handleFocus={handleFocus}
          name="name"
          className={` mb-1 no-outline p-8 md-rounded ${
            formFieldError.name ? "red-border-color" : "gray-border-color"
          }`}
          handleChange={handleChange}
          value={formField.name}
          placeholder="Name"
          label="Enter Your Name"
          helperText={formFieldError.name}
        />
        <button onClick={handleSubmit(formField)} className="mt-20">
          <Text>{loading ? "Please Wait..." : "Submit"}</Text>
        </button>
      </form>
    </div>
  );
};
