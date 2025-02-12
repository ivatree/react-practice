import { initializeApp } from "firebase/app";
import { deleteField, getFirestore, setDoc, updateDoc, doc, getDoc, arrayRemove, addDoc, collection, deleteDoc,} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BACKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const saveBasket = async (items) => {
  const user = auth.currentUser;
  const userId = user ? user.uid : 'guest';
  try {
      await setDoc(doc(db, 'basket', userId), {
          items: items
      });
  } catch (e) {
      console.error("Ошибка сохранения корзины", e);
  }
};

const clearBasket = async () => {
  const user = auth.currentUser;
  const userId = user ? user.uid : 'guest';
  try {
      const docRef = doc(db, 'basket', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          await updateDoc(docRef, {
              items: deleteField()
          });
      } else {
          await setDoc(docRef, { items: [] });
      }
  } catch (e) {
      console.error('Ошибка очистки корзины', e);
  }
};

const deleteItem = async (itemToDelete) => {
  const user = auth.currentUser;
  const userId = user ? user.uid : 'guest';
  try {
      const docRef = doc(db, 'basket', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          await updateDoc(docRef, {
              items: arrayRemove(itemToDelete)
          });
      } else {
          await setDoc(docRef, { items: [] });
      }
  } catch (e) {
      console.error('Ошибка удаления элемента из корзины', e);
  }
};

const getBasket = async () => {
  const user = auth.currentUser;
  const userId = user ? user.uid : 'guest';
  try {
      const docSnap = await getDoc(doc(db, 'basket', userId));
      if (docSnap.exists()) {
          return docSnap.data().items || [];
      } else {
          return [];
      }
  } catch (e) {
      console.error('Ошибка при получении корзины', e);
  }
};

const replaceGuestBasket = async (userId) => {
  try {
      const guestDocRef = doc(db, 'basket', 'guest');
      const guestDocSnap = await getDoc(guestDocRef);
      if (guestDocSnap.exists()) {
          const guestItems = guestDocSnap.data().items || [];
          const userDocRef = doc(db, 'basket', userId);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
              const userItems = userDocSnap.data().items || [];
              const combinedItems = [...new Set([...userItems, ...guestItems])];
              await setDoc(userDocRef, { items: combinedItems });
          } else {
              await setDoc(userDocRef, { items: guestItems });
          }
          await setDoc(guestDocRef, { items: [] }); 
      }
  } catch (e) {
      console.error('Ошибка при переносе корзины гостя', e);
  }
};

const addNewProduct = async (
    image: string,
    title: string,
    description: string,
    price: number,
    category: string,
  ) => {
    try {
      await addDoc(collection(db, 'pizza-card'), {
        image,
        title,
        description,
        price,
        category,
      });
    } catch (error) {
      console.error('Ошибка добавления документа!', error);
    }
  };

  const deleteProductCard = async (id: string) => {
    try{
        await deleteDoc(doc(db, 'pizza-card', id))
    }
    catch (error){
        console.error('Ошибка удаления документа!', error);
    }
  }

  const updateProduct = async (id: string, image: string, title: string, description: string, price, category: string) => {
    try{
        const productRef = doc(db, 'pizza-card', id);
        await updateDoc(productRef, {
            image, 
            title,
            description,
            price,
            category,
        })
    }
    catch(error){
        console.error('Ошибка сохранения изменений!', error);
        
    }
  }

export {auth, db, saveBasket, clearBasket, getBasket, deleteItem, replaceGuestBasket, addNewProduct, deleteProductCard, updateProduct}