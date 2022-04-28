import Box from '@mui/material/Box';
import { Grid, Button, Divider } from '@mui/material';
import Arweave from 'arweave';

// For "Property 'arweaveWallet' does not exist on type 'Window'." error.
interface Window {
  arweaveWallet: any
}
declare var window: Window

export const Arconnect = () => {
  const arweave = Arweave.init({
    // --- Localnet ---
    // host: '127.0.0.1',
    // port: 1984,
    // protocol: 'http'

    // --- Testnet ---
    // (Note: Tesnet powered by https://redstone.finance/)
    host: 'testnet.redstone.tools',
    port: 443,
    protocol: 'https'
  });

  async function connectWallet() {
    if (window.arweaveWallet) {
      // Permissions: https://github.com/th8ta/ArConnect#permissions
      const response = await window.arweaveWallet.connect([
          'ACCESS_ADDRESS',
          'SIGN_TRANSACTION'
      ]);
      const address = await window.arweaveWallet.getActiveAddress();
      console.log('ArConnect Connected! Public Key:', address);
    } else {
      console.log("Couldn't find ArConnect on your browser.");
    }
  }

  async function disconnetWallet() {
    await window.arweaveWallet.disconnect();
    console.log('Disconnected!');
  }


  async function getBalance() {
    const address = await window.arweaveWallet.getActiveAddress();
    const balance = await arweave.wallets.getBalance(address);
    const ar = arweave.ar.winstonToAr(balance);

    console.log(ar, 'AR');
  }

  async function airdrop() {
    const address = await window.arweaveWallet.getActiveAddress();
    // 100 AR = 100000000000000 Winston
    const response = await arweave.api.get('mint/' + address + '/100000000000000');
    console.log(response);
  }

  return(
    <Box>
      <Divider textAlign="left" sx={{mt: 2, mb: 2}}>Connect Wallet(ArConnect)</Divider>

      <Grid container>
        <Grid item xs={2}>
          <Button variant="contained" color="secondary" onClick={connectWallet}>Connect</Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="secondary" onClick={disconnetWallet}>Disconnect</Button>
        </Grid>
      </Grid>

      <Divider textAlign="left" sx={{mt: 2, mb: 2}}>Optional</Divider>

      <Grid container>
        <Grid item xs={2}>
          <Button variant="contained" color="secondary" onClick={getBalance}>Get Balance</Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="secondary" onClick={airdrop}>Airdrop</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
