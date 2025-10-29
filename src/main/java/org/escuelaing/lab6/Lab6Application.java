package org.escuelaing.lab6;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Collections;

@SpringBootApplication
public class Lab6Application {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(Lab6Application.class);
		app.setDefaultProperties(Collections
				.singletonMap("server.port", getPort()));
		app.run(args);
	}

	static int getPort() {
		if (System.getenv("PORT") != null) {
			return Integer.parseInt(System.getenv("PORT"));
		}
		return 8080;
	}
}
