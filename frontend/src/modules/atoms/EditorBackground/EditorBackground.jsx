import styled from "styled-components";
import { useEffect, useState } from 'react';

const Bg = styled.div`
  width: 100%;
  height: 100%;
  background: #eaeaea;

  padding: 18.55px 18.55px 18.55px 18.55px;

  font-family: "Gmarket Sans TTF";
  font-style: normal;
  font-weight: 500;
  font-size: 15.6237px;
  line-height: 18px;
  /* identical to box height */

  color: #1e1e1e;

  overflow: scroll;
`;

export const EditorBackground = ({ content,assignmentId,id,pfList, ...restProps }) => {
  const [tcResult, setTcResult] = useState(null);
  useEffect(() => {
    if(pfList){
      setTcResult(pfList.find((data, index) => {
        return data.id == id
      }));
    }

  }, [pfList])
  return <Bg>{content} {tcResult? tcResult.is_pass? "P": " F" : ""}</Bg>;
};


