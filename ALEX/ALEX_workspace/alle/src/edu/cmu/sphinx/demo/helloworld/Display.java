package edu.cmu.sphinx.demo.helloworld;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
public class Display {

    

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		JFrame frame = new JFrame("Test");
		frame.setVisible(true);
		frame.setSize(800, 800);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		JLabel label = new JLabel("This Is Where You Can Ask Alex Anything");
		JPanel panel = new JPanel(new GridBagLayout());
		frame.add(panel);
		GridBagConstraints c = new GridBagConstraints();
		panel.add(label);
		JButton button = new JButton("Start Talking");
		c.gridx = 0;
		c.gridy = 5;
		panel.add(button, c);

		
	
		button.addActionListener(new Action());
		
HelloWorld.main(args);		
		

	}//end of constructor function
	
	static class Action implements ActionListener{
		
	

		public void actionPerformed(ActionEvent e) {
			JFrame frame2 =new JFrame("What You Said");
			frame2.setVisible(true);
			frame2.setSize(200, 200);
			JLabel label = new JLabel("Welcome To My World");
			JPanel panel = new JPanel();
			frame2.add(panel);
			panel.add(label);
			
		}
		
		
		
	}

}