import { PostType } from "./PostType";

export type PostFormProps = {
    post?: PostType;
    action: "Bubble" | "Update";
};