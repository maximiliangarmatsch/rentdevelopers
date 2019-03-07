import React from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./OrderRecieved.css"

const OrderReceived = () => {
	return (

		<MDBContainer>
      <MDBRow >
				<MDBCol md="4" smd="4"/>
				<MDBCol md="4" smd="4">
					<h1 className="text-center head1">Order Received</h1>
				</MDBCol>
				<MDBCol md="4" smd="4"/>
			</MDBRow>
			<MDBRow>
				<MDBCol md="4" smd="4"/>
				<MDBCol md="4" smd="4">
						<p className="text-center par1">Thank you for your order, we will get back to you shortly!</p>
				</MDBCol>
				<MDBCol md="4" smd="4"/>
			</MDBRow>
			<MDBRow>
				<MDBCol md="4" smd="4"/>
				<MDBCol md="4" smd="4" className="text-center">
            <a href="/members">Go back to developers</a>
				</MDBCol>
				<MDBCol md="4" smd="4"/>
			</MDBRow>
		</MDBContainer>
	);
};

export default OrderReceived;
