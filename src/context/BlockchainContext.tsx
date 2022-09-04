import { useEffect, useState, createContext } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { httpService } from '../services/http';
import { AUTH } from '../constants';

export type AppContextProps = {
  connectedAccount: string | undefined;
  isConnected: boolean | undefined;
  isInstalled: boolean | undefined,
  isAccountLoading: boolean | undefined,
  connectWallet: (existingAddress?: string) => void;
  disconnect: () => void;
  getProvider: () => Promise<ethers.providers.Web3Provider | undefined>;
};

export const BlockchainContext = createContext<AppContextProps>({} as AppContextProps);

type Props = {
  children: React.ReactNode;
};

export const BlockchainProvider = ({ children }: Props) => {
  const [connectedAccount, setConnectedAccount] = useState<string | undefined>();
  const [isConnected, setIsConnected] = useState<boolean | undefined>(false);
  const [isInstalled, setIsInstalled] = useState<boolean | undefined>(true);
  const [isAccountLoading, setIsAccountLoading] = useState<boolean | undefined>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

  if(window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      if (!accounts) {
        return;
      }

      if (accounts.length === 0) {
        setConnectedAccount(undefined);
        return;
      }

      connectWallet();
    });
  }

  const connectWallet = async () => {
    setIsConnected(false);
    setIsAccountLoading(true);
    if(!window.ethereum) {
      alert('please install metamask first');
      setIsInstalled(false);
      setIsAccountLoading(false);
      return;
    } else {
      setIsInstalled(true);
      setIsAccountLoading(false);
    }

    try {
      const web3Modal = new Web3Modal({ cacheProvider: true });
      const connection = await web3Modal.connect();
      const webProvider = new ethers.providers.Web3Provider(connection);
      setProvider(webProvider);

      const accounts = await webProvider.listAccounts();
      const currentConnectedAccount = localStorage.getItem('connected');
      if (accounts) {
        if (currentConnectedAccount !== accounts[0]) {
          setConnectedAccount(accounts[0]);
          localStorage.setItem('connected', accounts[0]); 
          
          // TODO: check if refreshToken exists and generate new token? needs to be discussed if this is a good idea
          const refreshToken = localStorage.getItem(AUTH.REFRESH_TOKEN);

          const { data: signNonce } = await httpService.get(`/auth/${accounts[0]}`);
          if (!signNonce) {
            disconnect();
            return;
          }

          const signedMessage = await webProvider.getSigner().signMessage(
            `Sign this transaction to verify your identity: ${signNonce}`
          );

          const { data: authData } = await httpService.post(`/auth/${accounts[0]}`, { signedMessage });
          if (!authData) {
            disconnect();
            return;
          }

          localStorage.setItem(AUTH.ACCESS_TOKEN, authData.token.accessToken);
          localStorage.setItem(AUTH.REFRESH_TOKEN, authData.token.refreshToken);
        } else {
          setConnectedAccount(currentConnectedAccount);
        }

        setIsConnected(true);
      }
    } catch (error) {
      console.log('Error ', error);
    } finally {
      setIsAccountLoading(false);
    }
  };

  const getProvider = async (): Promise<ethers.providers.Web3Provider | undefined> => {
    if (connectedAccount == undefined) {
      return;
    }
    return provider;
  };

  const disconnect = async () => {
    const web3Modal = new Web3Modal({ cacheProvider: true });
    if (web3Modal.cachedProvider) {
      web3Modal.clearCachedProvider();
      setConnectedAccount(undefined);
      localStorage.removeItem('connected');
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <BlockchainContext.Provider
      value={{ connectedAccount, isConnected, isInstalled, isAccountLoading, connectWallet, disconnect, getProvider }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};
