"use client";
import { useAppSelector } from "@/app/Slice/ReduxStore";
import React, { useEffect, useState } from "react";

const Timer = () => {
  const [user1, setUser1] = useState(600);
  const [user2, setUser2] = useState(600);
  const { countForWhiteOrBlackMove } = useAppSelector(
    (store) => store.ChessBoardMatrix
  );

  useEffect(() => {
    let user1Timer: ReturnType<typeof setInterval>;
    if (user1 !== 0 && countForWhiteOrBlackMove % 2 === 0) {
      user1Timer = setInterval(() => {
        setUser1((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(user1Timer);
    };
  }, [user1, countForWhiteOrBlackMove]);

  useEffect(() => {
    let user2Timer: ReturnType<typeof setInterval>;
    if (user2 !== 0 && countForWhiteOrBlackMove % 2 !== 0) {
      user2Timer = setTimeout(() => {
        setUser2((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(user2Timer);
    };
  }, [user2, countForWhiteOrBlackMove]);

  return (
    <div>
      Timer{user1 + " "}
      {user2}
    </div>
  );
};
export default Timer;
