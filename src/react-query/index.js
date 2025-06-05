import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  getProductById,
  getProducts,
  getProductsByCategory,
  toggleFavoriteProduct,
  getUserInfo,
  login,
  register,
  updateUserInfo,
  logout,
  db,
  auth,
} from "../api";
import {createUserWithEmailAndPassword, updateProfile ,onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";


export const useProducts = () => {
  return useQuery([], getProducts);
};

export const useProductsByCategory = (category) => {
  return useQuery([category], getProductsByCategory);
};

export const useProductById = (productId) => {
  return useQuery([productId], getProductById);
};

export const useToggleFavoriteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleFavoriteProduct, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["uid"]);
    },
  });
};

export const useUserInfo = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, async (user) => {
          if (!user) {
            resolve(null);
          } else {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            resolve({ uid: user.uid, email: user.email, ...docSnap.data() });
          }
        });
      });
    },
  });
};

export const useSignInWithEmailPassword = () => {
  const queryClient = useQueryClient();
  return useMutation(login, {
    onSuccess: () => {
      queryClient.invalidateQueries(["uid"]);
    },
  });
};

export const useRegisterWithEmailPassword = () => {
  return useMutation(async ({ email, password, name }) => {
    // 建立帳號
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // 設定用戶名稱（顯示名稱）
    await updateProfile(result.user, { displayName: name });

    // Firebase 會自動登入，不需另外登入
    return result.user; // ← 很重要，這會觸發 Firebase 的 onAuthStateChanged()
  });
};


export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ uid, ...profileData }) => {
  const user = auth.currentUser;
  console.log("Current User:", user?.uid);

  const cleanData = Object.fromEntries(
    Object.entries(profileData).filter(([_, v]) => v !== undefined)
  );

  await setDoc(doc(db, "users", uid), cleanData, { merge: true });

  localStorage.setItem("user", JSON.stringify(user));
},
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userInfo");
      },
    }
  );
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries(["uid"]); 
    },
  });
};

