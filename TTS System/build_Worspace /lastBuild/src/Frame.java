
	import javax.swing.*;
	import java.awt.*;
	import java.awt.event.*;
	import javax.swing.JFrame ;


public class Frame extends FreeTTSHelloWorld {

	/**
	 * @param args
	 */
	public static void main(final String[] args) {
		// TODO Auto-generated method stub
		
		JFrame frame = new JFrame("Test");
		frame .setVisible(true);
		frame.setSize(800,800);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		JLabel label = new JLabel("Anything You Type I Can Say");
		JPanel panel = new JPanel();
		
		frame.add(panel);
		panel.add(label);
		
		JButton button = new JButton("Talk To Me");
		panel.add(button);
		JTextField  textfield = new JTextField();
		panel.add(textfield);
//		
//		static class Action implements ActionListener{
//			
//			public void actionPerformed (ActionEvent e) {
//				
//				
//				
//				
//			}
//		}
		
		}

}
