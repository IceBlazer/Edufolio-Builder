import { initializeApp } from '@firebase/app';
import { getStorage } from '@firebase/storage';

const firebaseConfig = {
    // Your Firebase config here
  };
  
  const firebaseApp = initializeApp(firebaseConfig);
  const storage = getStorage(firebaseApp);
  
  export { storage };