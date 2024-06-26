/* eslint-disable react-hooks/exhaustive-deps */
import {useDispatch, useSelector} from "react-redux";
import {Button, Modal, Form} from "react-bootstrap";
import {Controller, useForm} from "react-hook-form";
import {addAddress, setAdressForm} from "redux/features/addressSlice";
import {MdOutlineClose} from "react-icons/md";
import {AuthUser} from "utils";
import {
  customerAddressApi,
  updateOrCreateAddressApi,
} from "services/customer.service";
import {toast} from "react-hot-toast";
import {useEffect, useState} from "react";
import {Typeahead} from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import {yupResolver} from "@hookform/resolvers/yup";
import {AddressValidationSchema} from "validate";

function AddressForm() {
  const address = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const {
    register,
    formState: {errors},
    handleSubmit,
    setValue,
    control,
    reset,
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    resolver: yupResolver(AddressValidationSchema),
  });
  const [selectedOption, setSelectedOption] = useState([]);
  const onSubmit = (formData) => {
    var payload = {
      ...formData,
      post_code: formData?.post_code[0]?.label,
      customer_id: AuthUser()?.id,
      id: address?.edit_value?.customer_address_id,
    };
    console.log("payload", payload);

    updateOrCreateAddressApi(payload).then((response) => {
      localStorage.setItem(
        "addressList",
        JSON.stringify(response?.data?.addresses)
      );
      toast.success(response.data.message);
      dispatch(
        addAddress({
          status: false,
          type: address.type,
          value: response.data.addresses,
        })
      );
      reset();
      setSelectedOption([]);
    });
  };
  const [addressMaster, setAdressMaster] = useState([]);
  const [countryMaster, setCountryMaster] = useState([]);
  const [stateMaster, setStateMaster] = useState([]);
  const [pincodeMaster, setPincodeMaster] = useState([]);

  const getMasters = async () => {
    const {data} = await customerAddressApi();
    if (data?.status === "success") {
      setAdressMaster(data.address_type);
      setStateMaster(data.state);
      setCountryMaster(data.country);
      setPincodeMaster(
        // data?.pincode.map(data => reurn()
        // )
        data?.pincode?.map((value, index) => {
          return {
            id: value?.id,
            label: value?.pincode,
          };
        })
      );
    }
  };

  useEffect(() => {
    getMasters();
    if (address?.edit_value && address?.edit_value?.length !== 0) {
      setValue("id", address?.edit_value?.id);
      setValue("name", address?.edit_value?.name);
      setValue("address_type_id", address?.edit_value?.address_type_id);
      setValue("email", address?.edit_value?.email);
      setValue("mobile_no", address?.edit_value?.mobile_no);
      setValue("address", address?.edit_value?.address_line1);
      setValue("city", address?.edit_value?.city);
      setValue("state", address?.edit_value?.stateid);
      setValue("country", address?.edit_value?.countryid);
      // setSelectedOption([
      //   {
      //     id: parseInt(address?.edit_value?.post_code),
      //     label: address?.edit_value?.post_code_number,
      //   },
      // ]);
      setValue("post_code", [
        {
          id: parseInt(address?.edit_value?.post_code),
          label: address?.edit_value?.post_code_number,
        },
      ]);
    } else {
      reset();
    }
  }, [address?.edit_value]);

  if (address.status)
    return (
      <Modal
        show={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="new-address-modal"
      >
        <Modal.Header className="bg-light">
          <Modal.Title className="fs-5 fw-bold text-info">
            {address.type === "CREATE"
              ? "Add a New Shipping Address"
              : "Edit Shipping Address"}
          </Modal.Title>
          <button
            className="btn btn-light popupclose-btn"
            onClick={() => {
              dispatch(setAdressForm({status: false, type: address.type}));
              setSelectedOption([]);
            }}
          >
            <MdOutlineClose />
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <h3 className="fs-5 text-info">Contact Details</h3>
            <div className="flex-jc-btwn gap-1 flex-wrap">
              <Form.Group
                className="mb-3"
                controlId="name"
                style={{width: "49%"}}
              >
                <Form.Control
                  type="text"
                  placeholder="Name"
                  {...register("name", {
                    required: "This is required.",
                  })}
                  className={`${errors.name ? "border-danger" : ""}`}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="contactnumber"
                style={{width: "49%"}}
              >
                <Form.Control
                  type="number"
                  placeholder="Mobile Number"
                  className={`${errors.mobile_no ? "border-danger" : ""}`}
                  {...register("mobile_no", {
                    required: "This is required.",
                    pattern: {
                      value:
                        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                      message: "Not a valid Mobile Number",
                    },
                  })}
                />
              </Form.Group>
            </div>
            <div className="flex-jc-btwn gap-1 flex-wrap">
              <Form.Group
                className="mb-3"
                controlId="Email"
                style={{width: "49%"}}
              >
                <Form.Control
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "This is required.",
                  })}
                  className={`${errors.email ? "border-danger" : ""}`}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="addresstype"
                style={{width: "49%"}}
              >
                <Form.Select
                  {...register("address_type_id", {
                    required: "This is required.",
                  })}
                  className={`${errors.address_type_id ? "border-danger" : ""}`}
                >
                  <option value=""> Select Your Address type </option>
                  {addressMaster.length !== 0 &&
                    addressMaster.map((address_type) => (
                      <option key={address_type?.id} value={address_type?.id}>
                        {address_type.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </div>
            <h3 className="fs-5 text-info">Address</h3>
            <Form.Group className="mb-3" controlId="street">
              <Form.Control
                type="text"
                placeholder="Building Number, Street Name & Locality"
                {...register("address", {
                  required: "This is required.",
                })}
                className={`${errors.address ? "border-danger" : ""}`}
              />
            </Form.Group>
            <div className="flex-jc-btwn gap-1 flex-wrap">
              <Form.Group
                className="mb-3"
                controlId="city"
                style={{width: "49%"}}
              >
                <Form.Control
                  type="text"
                  placeholder="City"
                  {...register("city", {
                    required: "This is required.",
                  })}
                  className={`${errors.city ? "border-danger" : ""}`}
                />
              </Form.Group>
              <Controller
                name="post_code"
                control={control}
                render={({field}) => {
                  return (
                    <Form.Group
                      className="mb-3"
                      controlId="post_code"
                      style={{width: "49%"}}
                    >
                      <Typeahead
                        id="my-typeahead"
                        labelKey="label"
                        inputProps={{
                          type: "number",
                        }}
                        className={`${errors.post_code ? "border-danger" : ""}`}
                        clearButton
                        allowNew
                        placeholder="Pincode"
                        options={pincodeMaster}
                        selected={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        positionFixed={true}
                      />
                    </Form.Group>
                  );
                }}
              />
              {/* <Form.Group
                className="mb-3"
                controlId="post_code"
                style={{width: "49%"}}
              >
                <Typeahead
                  id="my-typeahead"
                  labelKey="label"
                  inputProps={{
                    type: "number",
                  }}
                  {...register(
                    "post_code"
                    //  {
                    // required: "This is required.",
                    // }
                  )}
                  className={`${errors.post_code ? "border-danger" : ""}`}
                  clearButton
                  allowNew
                  placeholder="Pincode"
                  options={pincodeMaster}
                  selected={selectedOption}
                  onChange={setSelectedOption}
                />
              </Form.Group> */}
              {/* <Form.Group
              className="mb-3"
              controlId="post_code"
              style={{ width: "49%" }}
            >
              <Form.Select
                {...register("post_code", {
                  required: "This is required.",
                })}
                className={`${errors.post_code ? 'border-danger' : ''}`} >
                <option value=""> Select Your Pincode </option>
                {
                  pincodeMaster.length !== 0 && pincodeMaster.map((item) => (
                    <option key={item.id} value={item.id}>{item.pincode}</option>
                  ))
                }
              </Form.Select> */}
              {/* <Form.Control
                type="text"
                placeholder="Pincode"
                className={`${errors.post_code ? 'border-danger' : ''}`}
                {...register("post_code", {
                  required: "This is required.",
                })}
              /> */}
              {/* </Form.Group> */}
            </div>
            <div className="flex-jc-btwn gap-1 flex-wrap">
              <Form.Group
                className="mb-3"
                controlId="state"
                style={{width: "49%"}}
              >
                <Form.Select
                  {...register("state", {
                    required: "This is required.",
                  })}
                  className={`${errors.state ? "border-danger" : ""}`}
                >
                  <option value=""> Select Your State </option>
                  {stateMaster.length !== 0 &&
                    stateMaster.map((state) => (
                      <option key={state?.id} value={state?.id}>
                        {state.state_name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="country"
                style={{width: "49%"}}
              >
                <Form.Select
                  {...register("country", {
                    required: "This is required.",
                  })}
                  className={`${errors.country ? "border-danger" : ""}`}
                >
                  <option value=""> Select Your Country </option>
                  {countryMaster.length !== 0 &&
                    countryMaster.map((country) => (
                      <option key={country?.id} value={country?.id}>
                        {country.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="text-center mt-3 mb-1">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
}

export default AddressForm;
