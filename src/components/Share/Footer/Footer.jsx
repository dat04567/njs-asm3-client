
import React from 'react';
import { Link } from 'react-router-dom';
function Footer(props) {
	return (
		<footer className='bg-dark text-white'>
			<div className='container py-4'>
				<div className='row py-5'>
					<div className='col-md-4 mb-3 mb-md-0'>
						<h6 className='text-uppercase mb-3'>Customer services</h6>
						<ul className='list-unstyled mb-0'>
							<li>
								<Link className='footer-link' href='#'>
									Help &amp; Contact Us
								</Link>
							</li>
							<li>
								<Link className='footer-link' href='#'>
									Returns &amp; Refunds
								</Link>
							</li>
							<li>
								<Link className='footer-link' href='#'>
									Online Stores
								</Link>
							</li>
							<li>
								<Link className='footer-link' href='#'>
									Terms &amp; Conditions
								</Link>
							</li>
						</ul>
					</div>
					<div className='col-md-4 mb-3 mb-md-0'>
						<h6 className='text-uppercase mb-3'>Company</h6>
						<ul className='list-unstyled mb-0'>
							<li>
								<Link className='footer-link' href='#'>
									What We Do
								</Link>
							</li>
							<li>
								<Link className='footer-link' href='#'>
									Available Services
								</Link>
							</li>
							<li>
								<Link className='footer-link' href='#'>
									Latest Posts
								</Link>
							</li>
							<li>
								<Link className='footer-link' href='#'>
									FAQs
								</Link>
							</li>
						</ul>
					</div>
					<div className='col-md-4'>
						<h6 className='text-uppercase mb-3'>Social media</h6>
						<ul className='list-unstyled mb-0'>
							<li>
								<Link className='footer-link' href='#'>
									Twitter
								</Link>
							</li>
							<li>
								<Link className='footer-link' href='#'>
									Instagram
								</Link>
							</li>
							<li>
								<Link className='footer-link' href='#'>
									Facebook
								</Link>
							</li>
							<li>
								<Link className='footer-link' href='#'>
									Pinterest
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
