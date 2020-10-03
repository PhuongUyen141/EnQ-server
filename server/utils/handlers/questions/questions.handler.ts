import * as admin from "firebase-admin";
import * as Joi from "joi";
import { resQuestion } from "../../../models/question.model";
import { pick, inRange } from "../../common";

export const validateQuestion = (body) => {
  const schema = Joi.object().keys({
    title: Joi.number().required(),
    type: Joi.string().required(),
    rank: Joi.number().required(),
    answers: Joi.array().required(),
  });

  const { error, value } = schema.validate(body);
  if (error && error.details) {
    return {
      error,
    };
  }
  return {
    value,
  };
};

export const isAlreadyQuestion = (body) => {};

export const getAllQuestions = async (db, collectionName) => {

  const questionsRef = db.collection(collectionName);
  const snapshot: Array<resQuestion> = await questionsRef
    .where("type", "==", 0)
    .get()
    .then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return data;
    })
    .then((querySnapshot) => querySnapshot)
    .catch((err) => err);
  return snapshot;
};

export const getRandomQuestions = (questions) => {
  let data: Array<resQuestion> = [];
  for (let i = 0; i < 10; i++) {
    data.push(questions[Math.floor(Math.random() * questions.length)]);
  }

  return data;
};