document.addEventListener('DOMContentLoaded', async function() {
    // Initialize OpenPGP
    const { openpgp } = window;
    openpgp.config.showComment = false;
    openpgp.config.showVersion = false;

    // Tab switching
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-button, .tab-content').forEach(el => {
                el.classList.remove('active');
            });
            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });

    // Key Generation
    document.getElementById('generate-keys-button').addEventListener('click', async function() {
        const button = this;
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const passphrase = document.getElementById('key-passphrase').value;
        
        if (!name || !email) {
            alert('Please enter both name and email');
            return;
        }

        try {
            button.disabled = true;
            button.textContent = 'Generating...';

            const { privateKey, publicKey } = await openpgp.generateKey({
                type: 'ecc',
                curve: 'curve25519',
                userIDs: [{ name, email }],
                format: 'armored',
                passphrase: passphrase || undefined // Proper handling
            });

            document.getElementById('public-key-result').value = publicKey;
            document.getElementById('private-key-result').value = privateKey;
            document.querySelector('#keygen .result-container').classList.remove('hidden');
            
            if (!passphrase) {
                alert('⚠️ Important: Your private key has no passphrase. Anyone with access to this key can use it.');
            }
        } catch (error) {
            console.error(error);
            alert(`Key generation failed: ${error.message}`);
        } finally {
            button.disabled = false;
            button.textContent = 'Generate Keys';
        }
    });

    // Encryption
    document.getElementById('encrypt-button').addEventListener('click', async function() {
        const button = this;
        const publicKey = document.getElementById('public-key').value.trim();
        const message = document.getElementById('message-to-encrypt').value.trim();

        if (!publicKey || !message) {
            alert('Please provide both public key and message');
            return;
        }

        try {
            button.disabled = true;
            button.textContent = 'Encrypting...';

            const encrypted = await openpgp.encrypt({
                message: await openpgp.createMessage({ text: message }),
                encryptionKeys: await openpgp.readKey({ armoredKey: publicKey })
            });

            document.getElementById('encrypted-result').value = encrypted;
            document.querySelector('#encrypt .result-container').classList.remove('hidden');
        } catch (error) {
            console.error(error);
            alert(`Encryption failed: ${error.message}`);
        } finally {
            button.disabled = false;
            button.textContent = 'Encrypt Message';
        }
    });

    // Decryption (works with or without passphrase)
    document.getElementById('decrypt-button').addEventListener('click', async function() {
        const button = this;
        const privateKey = document.getElementById('private-key').value.trim();
        const passphrase = document.getElementById('passphrase').value;
        const message = document.getElementById('message-to-decrypt').value.trim();

        if (!privateKey || !message) {
            alert('Please provide both private key and message');
            return;
        }

        try {
            button.disabled = true;
            button.textContent = 'Decrypting...';

            const privKey = await openpgp.readPrivateKey({ armoredKey: privateKey });
            const decrypted = await openpgp.decrypt({
                message: await openpgp.readMessage({ armoredMessage: message }),
                decryptionKeys: await (passphrase 
                    ? openpgp.decryptKey({ privateKey: privKey, passphrase })
                    : Promise.resolve(privKey))
            });

            document.getElementById('decrypted-result').value = decrypted.data;
            document.querySelector('#decrypt .result-container').classList.remove('hidden');
        } catch (error) {
            console.error(error);
            alert(`Decryption failed: ${error.message}`);
        } finally {
            button.disabled = false;
            button.textContent = 'Decrypt Message';
        }
    });

    // Copy buttons
    document.querySelectorAll('.copy-button').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.id.replace('copy-', '') + '-result';
            const textarea = document.getElementById(targetId);
            textarea.select();
            document.execCommand('copy');
            
            const originalText = this.textContent;
            this.textContent = 'Copied!';
            setTimeout(() => this.textContent = originalText, 2000);
        });
    });
});