import { EditIcon, SendMessageIcon, TrashIcon } from "@/Icons";
import AppImage from "@/components/Image/AppImage";
import AppInput from "@/components/Input/AppInput";
import Text from "@/components/Text/Text";
import AppTextarea from "@/components/Textarea/AppTextarea";
import React, { useEffect, useRef, useState } from "react";
import SupportMessageList from "./SupportMessageList";
import { useMutation } from "react-query";
import makePostRequest from "@/utils/makePostRequest";
import toast from "react-hot-toast";
import { POST_TICKET_NOTES } from "@/api/urls/urls";
import { ClipLoader } from "react-spinners";
import useChatScroll from "@/utils/hooks/useChatScroll";

function AddNotes({ ticketId, messageList, refetch }) {
  const [note, setNote] = useState("");

  const { data, isLoading, mutate } = useMutation(
    (body) => makePostRequest(POST_TICKET_NOTES, body),
    {
      onSuccess: (res) => {
        toast.success("Notes Added");
        setNote("");
        refetch();
      },
      onError: (error) => {
        const firstErrKey = Object.keys(error?.response?.data?.data)?.[0];
        toast.error("Something went wrong");
      },
    }
  );
  const [a, setA] = useState(true);
  // console.log("aaaa", a);

  const { ref } = useChatScroll({ dep: messageList });


  const handleSubmit = () => {
    if (note !== "")
      mutate({
        notes: note,
        support_ticket: ticketId,
      });
  };


  return (
    <div className="mt-[30px]">
      <Text className={"font-bold text-[#1D1D1D] pb-[10px]"}>Add Notes</Text>
      <div className="mb-[20px]">
        <SupportMessageList refProp={ref} messageList={messageList} />
        <div className=" flex mt-[19px] w-full relative">
          <AppTextarea
            value={note}
            onChange={(e) => setNote(e?.target?.value)}
            type="textarea"
            className="border rounded-[5px] w-full"
            wrapperClassName="w-full"
            name={"note"}
            placeholder={"Enter note..."}
          />
          {!isLoading ? (
            <div
              onClick={() => handleSubmit()}
              className="absolute top-[10px] right-[10px] cursor-pointer"
            >
              {<AppImage src={SendMessageIcon} />}
            </div>
          ) : (
            <div className="absolute top-[5px] right-[10px] cursor-pointer">
              <ClipLoader size={"12px"} color={"#2B5CAB"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddNotes;
