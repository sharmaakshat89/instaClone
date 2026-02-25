import { useEffect } from "react";

import { usePostStore } from "./post.store";

const feed= usePostStore(state=>state.feed)
const followers= usePostStore(state=>state.followers)
const following= usePostStore(state=>state.following)
const loadFeed= usePostStore(state=>state.loadFeed)
const loadFollowers= usePostStore(state=>state.loadFollowers)
const loadFollowing= usePostStore(state=>state.loadFollowing)
const feed= usePostStore(state=>state.feed)
const feed= usePostStore(state=>state.feed)
const feed= usePostStore(state=>state.feed)