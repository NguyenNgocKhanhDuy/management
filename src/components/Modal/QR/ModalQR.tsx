import React, { useState } from "react";
import "./modalQR.scss";
import { getToken } from "~/store/localStorage";
import QRCode from "react-qr-code";

function ModalQR(props: any) {
	const token = getToken();

	return (
		<div className="modalQR">
			<div className="modalQR-container">
				<i className="fa-solid fa-xmark modalQR-close" onClick={() => props.close()}></i>
				<QRCode size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={token ?? ""} viewBox={`0 0 256 256`} />
			</div>
		</div>
	);
}

export default ModalQR;
