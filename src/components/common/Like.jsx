import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

const Like = (props) => {
	return (
		<div style={{ cursor: "pointer" }} onClick={props.onClick}>
			{props.liked ? (
				<FontAwesomeIcon icon={fasHeart} />
			) : (
				<FontAwesomeIcon icon={farHeart} />
			)}
		</div>
	);
};

export default Like;
