import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const Signup = async (email, password,username) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
       
    });

    const userId = data?.user?.id;
  if (!userId) {
    console.error("No user ID returned from signup");
    return null;
  }

    const {data:userData , error:userError} = await supabase.from('users').insert([{id:userId , email:email,username:username}])

    if (userError) {
        console.error("Error inserting user into database:", userError.message);
    } else {
        console.log("User successfully added to database:", userData);
    }

    return data;
};


export const Login = async (email,password) => {

    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
        toast.error(error.message)
    }
  };

export const CreateProfile = async (name, description, category, price, rating, imageFile) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData?.user) {
      console.log("User not found or error getting user:", userError?.message);
      return;
    }
  
    const userId = userData.user.id;
  
    let imageUrl = null;
  
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `products/${userId}/${fileName}`;
  
      const { data: imageUploadData, error: imageUploadError } = await supabase.storage
        .from('productimage')
        .upload(filePath, imageFile);
  
      if (imageUploadError) {
        console.error("Image upload error:", imageUploadError.message);
        return;
      }
  
      const { data: imageUrlData } = supabase.storage
        .from('productimage')
        .getPublicUrl(filePath);
  
      imageUrl = imageUrlData.publicUrl;
    } else {
      console.warn("No image file provided");
    }
  
    const { data: createUser, error: createUserError } = await supabase.from('products').insert([{
      name,
      description,
      price,
      rating,
      category,
      user_id: userId,
      product_image: imageUrl
    }]);
  
    if (createUserError) {
      console.error("Error inserting user into database:", createUserError.message);
    } else {
      console.log("User successfully added to database:", createUser);
    }
  };
  


export const editProduct = async(id,name,description,category,price,rating)=>{
    const {data:userData , error:userError} =await supabase.auth.getUser()
    if (userError || !userData?.user) {
        console.log("User not found or error getting user:", userError?.message);
        return;
    }
    const userId = userData.user.id;

    const {data:updateProduct , error:updateProductError} = await supabase.from('products').update({
        name,
        description,
        price,
        rating,
        category,
        user_id:userId
    }).eq('id',id)
    if(updateProductError){
        console.error("Error inserting user into database:", updateProductError.message);
    }else{
        console.log("User successfully added to database:", updateProduct);
    }
}

export const getProductDetails = async (id)=>{
    const {data:userData , error:userError} =await supabase.auth.getUser()
    if (userError || !userData?.user) {
        console.log("User not found or error getting user:", userError?.message);
        return;
    }
    const userId = userData.user.id;

    const {data:productData , error:productError} = await supabase.from('products').select('*').eq('id',id).eq('user_id',userId).single()
    if(productError){
        console.error("Error inserting user into database:", productError.message);
    }else{
        console.log("User successfully added to database:", productData);
    }
    return productData;
}


export const deleteProduct = async(id)=>{
    const {data:userData , error:userError} =await supabase.auth.getUser()
    if (userError || !userData?.user) {
        console.log("User not found or error getting user:", userError?.message);
        return;
    }
    const userId = userData.user.id;
    const {data:deleteProduct , error:deleteProductError} = await supabase.from('products').delete().eq('id',id).eq('user_id',userId)
    if(deleteProductError){
        console.error("Error inserting user into database:", deleteProductError.message);
    }else{
        console.log("User successfully added to database:", deleteProduct);
        
    }
}