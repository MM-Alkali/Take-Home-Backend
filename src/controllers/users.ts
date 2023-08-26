import { Request, Response } from "express";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const submitUserData = async (req: Request, res: Response) => {
  try {
    const { companyName, numOfUsers, numOfProducts } = req.body;

    // Get the user's uid
    const user = firebase.auth().currentUser;
    if (!user) {
      return res.status(401).json({ message: "User not authenticated." });
    }
    const uid = user.uid;

    // Create a new Firestore document for the user
    const db = firebase.firestore();
    const docRef = db.collection("users").doc(uid);

    // Set the data in the document
    await docRef.set({
      companyName,
      numOfUsers,
      numOfProducts,
    });

    return res.status(200).json({ message: "User data updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Get the current user
    const user = firebase.auth().currentUser;
    if (!user) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    // Access Firestore
    const db = firebase.firestore();

    // Fetch all user documents from the "users" collection
    const usersCollection = db.collection("users");
    const querySnapshot = await usersCollection.get();

    const usersData: any[] = [];

    // Iterate through the query snapshot and extract user data
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      usersData.push(userData);
    });

    return res.status(200).json({ users: usersData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
