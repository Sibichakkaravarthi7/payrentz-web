import { useEffect, useRef } from "react";

const useChatScroll = ({ dep }) => {
  const ref = useRef(null);

  useEffect(() => {
    // console.log("triggered", ref)

    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);

  return {
    ref,
  };
};

export default useChatScroll;
