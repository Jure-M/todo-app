import reducer, { initState } from "./model";
import view from "./view";
import app from "./app";

const node = document.getElementById("app");

app(initState, reducer, view, node);
