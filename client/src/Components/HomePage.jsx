import placeHolder from '../assets/placeholder.png';
import './HomePage.css';

function HomePage() {
    return(
        <div className="homepage-container">
            <div className="content-section">
                <p className="headline" >Create Your Resume & Portfolio in Minutes</p>
                <div className="btns">
                    <button>Start</button>
                <button>Explore Templates</button>
                </div>
                
            </div>
            <div className="featured-section">
                <div className="section">
                    <img className="image" src={placeHolder} alt="Placeholder" style={{ width: '200px' }}/>
                    <div className="info">
                        <h3>Drag & Drop Resume Builder</h3>
                        <p>
                           Give users full control over their resume layout by allowing them to rearrange sections like Education, Experience, Skills, etc. using intuitive drag-and-drop functionality.
                        </p>
                        <ul>
                            <li>Reorder sections easily</li>
                            <li>Edit content inline without navigating forms</li>
                            <li>Visual layout changes reflect in real-time</li>
                            <li>Great for customizing resume for different job applications</li>
                        </ul>
                    </div>
                </div>

                <div className="section">
                    <div className="info">
                        <h3>Choose from Templates</h3>
                        <p>
                            Users can pick from a set of professionally designed resume templates that suit different roles and industries.                        </p>
                        <ul>
                            <li>Clean, modern, and classic styles</li>
                            <li>Responsive and printable layouts</li>
                            <li>Tailored fonts, color schemes, and section designs</li>
                            <li>Suitable for designers, developers, marketers, and more</li>
                        </ul>
                    </div>
                    <img className="image" src={placeHolder} alt="Placeholder" style={{ width: '200px' }}/>
                </div>

                <div className="section">
                    <img className="image" src={placeHolder} alt="Placeholder" style={{ width: '200px' }}/>
                    <div className="info">
                        <h3>Download as PDF or Publish Online</h3>
                        <p>
                           Once the resume is ready, users can either download it as a high-quality PDF or generate a public shareable link.
                        </p>
                        <ul>
                            <li>One-click PDF export (print-optimized)</li>
                            <li> Publish online with a unique URL</li>
                            <li>Option to make resume private or public</li>
                            <li> Ideal for sharing via LinkedIn, job applications, or personal portfolio</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage