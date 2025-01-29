import { initializeApp } from "firebase/app";
import { deleteField, getFirestore, setDoc, updateDoc, doc, getDoc, arrayRemove } from "firebase/firestore";
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

    if(user){
        try{
            console.log("Сохранение данных для пользователя", user.uid);
            console.log("Сохраняем данные", items);
            await setDoc(doc(db, 'basket', user.uid), {
                items: items
            })
            console.log('Корзина успешно сохранена в fireabse');            
        }catch(e){
            console.error("Ошибка сохранения коризины", e);
        }
    } else {
        console.error("Пользователь не авторирован");
    }
}

const clearBasket = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, 'basket', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await updateDoc(docRef, {
            items: deleteField()
          });
          console.log('Корзина успешно очищена в firebase');
        } else {
          console.log('Документ не найден. Создание нового документа.');
          await setDoc(docRef, { items: [] });
          console.log('Новый документ создан.');
        }
      } catch (e) {
        console.error('Ошибка очистки корзины', e);
      }
    } else {
      console.error('Пользователь не авторизован');
    }
  };  

const deleteItem = async (itemToDelete) => {
  const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, 'basket', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await updateDoc(docRef, {
            items: arrayRemove(itemToDelete)
          });
          console.log('Элемент успешно удален!');
        } else {
          console.log('Документ не найден. Создание нового документа.');
          await setDoc(docRef, { items: [] });
          console.log('Новый документ создан.');
        }
      } catch (e) {
        console.error('Ошибка удаления элемента из корзины', e);
      }
    } else {
      console.error('Пользователь не авторизован');
    }
} 

const getBasket = async () => {
    const user = auth.currentUser
    
    if(user){
        try {
            console.log("Данные пользователя", user.uid);
            const docSnap = await getDoc(doc(db, 'basket', user.uid))
            if(docSnap.exists()){
                console.log('Данные коризины', docSnap.data().items);
                return docSnap.data().items || [];
            } else {
                console.log('Документ не найден.');
                return []
            }
        } catch (e) {
            console.error('Ошибка при получении корзины', e);
        }
    } else {
        console.error('Пользователь не авторизован');
        
    }
}

export {auth, db, saveBasket, clearBasket, getBasket, deleteItem}