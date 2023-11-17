interface Props {
  darkMode: boolean
}

const LogoTest = ({ darkMode }:Props) => {
  return(
		<>
		<div style={{ marginLeft: "10px" }}>
			<svg fill={darkMode ? "#ffffff": "#000000"} height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999">
				<g>
					<g>
						<path d="M417.128,0H94.874c-43.429,0-78.76,35.332-78.76,78.76v268.494
	  		  	c0,43.421,35.331,78.746,78.76,78.746h53.371l94.459,81.076c7.649,6.565,18.945,6.564,26.592,0L363.754,426h53.372
	  		  	c43.427,0,78.758-35.326,78.758-78.746V78.76C495.886,35.332,460.555,0,417.128,0z M169.959,116.241
	  		  	c7.522-14.1,28.155-14.675,35.983,0c3.639,6.783,3.032,14.953-1.021,20.945c-7.986,12.155-26.065,11.987-33.941,0
	  		  	C166.837,131.061,166.368,122.936,169.959,116.241z M102.89,116.241c7.54-14.134,28.161-14.626,35.998,0
	  		  	c3.639,6.812,3.008,14.968-1.036,20.945c-8.058,12.26-26.127,11.896-33.943,0C99.925,131.294,99.197,123.125,102.89,116.241z
	  		  	 M102.89,203.385c7.325-13.727,26.633-14.373,34.964-1.715c5.173,7.843,4.28,17.596-1.184,24.28
	  		  	c-8.204,10.07-23.589,9.783-31.56,0C99.738,219.382,99.099,210.462,102.89,203.385z M256.005,320.562H120.888
	  		  	c-11.274,0-20.415-9.14-20.415-20.415s9.14-20.415,20.415-20.415h135.117c11.274,0,20.415,9.14,20.415,20.415
	  		  	S267.279,320.562,256.005,320.562z M239.029,201.67c8.203-12.471,27.527-12.22,34.962,1.715
	  		  	c4.446,8.299,2.488,18.007-3.552,24.048c-7.257,7.268-19.077,8.126-27.382,1.347C235.162,222.351,233.043,210.745,239.029,201.67z
	  		  	 M338.488,314.576c-8.551,8.551-22.638,7.798-30.227-1.483c-6.194-7.6-6.114-18.375,0-25.886c8.012-9.8,23.088-10.097,31.575,0
	  		  	C346.936,296.214,345.351,307.724,338.488,314.576z M406.892,313.093c-8.373,10.244-23.67,9.655-31.561,0
	  		  	c-5.398-6.622-5.979-15.546-2.218-22.565c7.555-14.083,28.119-14.688,35.998,0C412.841,297.521,412.329,306.422,406.892,313.093z
	  		  	 M406.892,225.95c-8.278,10.128-23.595,9.747-31.561,0c-6.47-7.939-5.817-18.931,0-25.886c7.862-9.619,23.143-10.299,31.561,0
	  		  	C412.841,207.175,413.276,218.116,406.892,225.95z M391.113,146.274H255.996c-11.274,0-20.415-9.14-20.415-20.415
	  		  	c0-11.274,9.14-20.415,20.415-20.415h135.117c11.274,0,20.415,9.14,20.415,20.415S402.389,146.274,391.113,146.274z"/>
					</g>
				</g>
			</svg>
		</div>
		</>
  )
}

export default LogoTest;