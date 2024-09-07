import React from "react";
import { ScaleLoader } from "react-spinners";
import "./loading.scss";

function Loading(props: any) {
	return (
		<div className="overlay">
			<ScaleLoader color="#45bc83" height={70} width={8} loading={props.loading} aria-label="Loading Spinner" data-testid="loader" />
		</div>
	);
}

export default Loading;
