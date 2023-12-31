export enum APIEndpoints {
  getQuizzes = "/quizzes",
  postQuizz = "/quizzes",
  editQuizz = "/quizzes/",
  deleteQuiz = "/quizzes/",
  getQuizz = "/quizzes/",
  getRecycledQuestions = "/questions",
  postRecycledQuestions = "/questions/",
}

export enum APIMethods {
  GET = "GET",
  DELETE = "DELETE",
  POST = "POST",
  PUT = "PUT",
}

export enum ButtonTypes {
  LINK = "LINK",
  BUTTON = "BUTTON",
  SUBMIT = "SUBMIT",
}

export enum Tabs {
  TITLE = "Title",
  QUESTIONS = "Questions",
  LENGTH = "Length",
}

export enum FieldTypes {
  INPUT = "INPUT",
  TEXTAREA = "TEXTAREA",
  CHECKBOX = "CHECKBOX",
  COMPONENT = "COMPONENT",
}

export enum LocalStorageKey {
  QUIZZ = "QUIZZ",
  CREATE_QUIZZ = "CREATE_QUIZZ",
}
