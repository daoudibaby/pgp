# PGP Web Client

A client-side PGP encryption/decryption tool that works entirely in your browser. No server-side processing means your private keys and messages never leave your device.

## Features

- 🔒 Encrypt messages with recipient's public key
- 🔓 Decrypt messages with your private key
- 🔑 Generate new PGP key pairs
- 📋 Copy results to clipboard with one click
- 🌐 Works entirely in the browser - no server processing
- 📱 Responsive design works on desktop and mobile

## How to Use

1. **Encrypt a Message**:

   - Paste the recipient's public key in the first textarea
   - Type your message in the second textarea
   - Click "Encrypt Message"
   - Copy the encrypted result to share with the recipient

2. **Decrypt a Message**:

   - Paste your private key in the first textarea
   - Enter your passphrase if the key is protected
   - Paste the encrypted message in the second textarea
   - Click "Decrypt Message" to see the original message

3. **Generate Keys**:
   - Enter your name and email
   - Optionally add a passphrase for extra security
   - Click "Generate Keys"
   - Securely save both your public and private keys

## Security Notes

- This tool runs entirely in your browser. No keys or messages are sent to any server.
- Your private key is the most sensitive piece of information. Never share it with anyone.
- For maximum security, consider using this tool in a private/incognito browser window.
- Always verify the identity of people you communicate with through other secure channels.

## Installation

To run locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/daoudibaby/pgp.git
   ```
