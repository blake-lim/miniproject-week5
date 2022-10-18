import React, { useState } from "react";

const useInput = () => {
  // 2. value는 useState로 관리,
  const [tempName, setName] = useState({
    writer: "",
    title: "",
    body: "",
  });

  // 3. 핸들러 로직도 구현.
  const handler = (e) => {
    const { name, value } = e.target;
    setName({
      ...tempName,
      [name]: value,
    });
  };

  // 1. 이 훅은 [ ] 을 반환하는데, 첫번째는 value, 두번째는 핸들러를 반환.
  return [tempName, handler];
};

export default useInput;
