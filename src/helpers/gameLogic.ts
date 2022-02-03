import { answerWords } from "../words"

export function answer(){
    return answerWords[Math.floor(Math.random()*answerWords.length)]
}