"use client";
import React from "react";
import styled from "styled-components";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onclick?: () => void;
  loading?: boolean;
}

const Button = ({ text, type, onclick, loading }: ButtonProps) => {
  return (
    <StyledWrapper>
      <button
        onClick={onclick}
        type={type}
        className="button"
        disabled={loading}
      >
        {loading ? (
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 100 101"
              className="inline w-4 h-4 mr-2 animate-bounce"
              role="status"
              aria-hidden="true"
            >
              <circle fill="rgb(193, 163, 98)" r="45" cy="50" cx="50" />
            </svg>
            Loading...
          </span>
        ) : (
          text
        )}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    cursor: pointer;
    position: relative;
    padding: 10px 24px;
    font-size: 18px;
    color: rgb(193, 163, 98);
    border: 2px solid rgb(193, 163, 98);
    border-radius: 34px;
    background-color: transparent;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    overflow: hidden;
  }

  .button::before {
    content: "";
    position: absolute;
    inset: 0;
    margin: auto;
    width: 75px;
    height: 50px;
    border-radius: inherit;
    scale: 0;
    z-index: -1;
    background-color: rgb(193, 163, 98);
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .button:hover::before {
    scale: 3;
  }

  .button:hover {
    color: #212121;
    scale: 1.1;
    box-shadow: 0 0px 20px rgba(193, 163, 98, 0.4);
  }

  .button:active {
    scale: 1;
  }
`;

export default Button;
