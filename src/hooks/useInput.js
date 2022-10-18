import React, { useState } from "react";

const useInput = () => {
<<<<<<< HEAD
  // 2. value는 useState로 관리,
=======
  // 2. value는 useState로 관리하고,
>>>>>>> 0fb720ef0fe122bb3e47ad000e72b712268be630
  const [tempName, setName] = useState({
    writer: "",
    title: "",
    body: "",
  });

<<<<<<< HEAD
  // 3. 핸들러 로직도 구현.
=======
  // 3. 핸들러 로직도 구현합니다.
>>>>>>> 0fb720ef0fe122bb3e47ad000e72b712268be630
  const handler = (e) => {
    const { name, value } = e.target;
    setName({
      ...tempName,
      [name]: value,
    });
  };

<<<<<<< HEAD
  // 1. 이 훅은 [ ] 을 반환하는데, 첫번째는 value, 두번째는 핸들러를 반환.
=======
  // 1. 이 훅은 [ ] 을 반환하는데, 첫번째는 value, 두번째는 핸들러를 반환합니다.
>>>>>>> 0fb720ef0fe122bb3e47ad000e72b712268be630
  return [tempName, handler];
};

export default useInput;
