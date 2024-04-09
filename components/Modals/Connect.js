"use client";
// Removed: "use client";  (Browser-specific directive)

import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { useWeb3Modal } from '@web3modal/ethers5/react';

function ConnectModal(props) {
  const { open } = useWeb3Modal();

  return React.createElement(
    Modal,
    { backdrop: "opaque", isOpen: props.isOpen, onClose: props.onClose },
    React.createElement(
      ModalContent,
      null,
      React.createElement(
        ModalHeader,
        { className: "flex flex-col gap-1" },
        "Connect Wallet"
      ),
      React.createElement(
        ModalBody,
        null,
        React.createElement(
          "div",
          { className: "p-4 md:p-5" },
          React.createElement(
            "p",
            { className: "text-sm font-normal text-gray-500 dark:text-gray-400" },
            "Connect with one of our available wallet providers or create a new one."
          ),
          React.createElement(
            "ul",
            { className: "my-4 space-y-3" },
            React.createElement(
              "li",
              null,
              React.createElement(
                "a",
                { onClick: () => open(), className: "flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white" },
                // SVG content here
                React.createElement("span", { className: "flex-1 ms-3 whitespace-nowrap" }, "WalletConnect")
              )
            )
          ),
          // ... (Other elements)
        )
      ),
      React.createElement(
        ModalFooter,
        null,
        React.createElement(
          "div",
          null,
          // ... (Other elements)
        )
      )
    )
  )
        }

export default ConnectModal;
