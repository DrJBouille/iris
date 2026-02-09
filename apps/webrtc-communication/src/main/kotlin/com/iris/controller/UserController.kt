package com.iris.controller

import com.iris.model.user.IrisUser
import com.iris.service.UserService
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import jakarta.transaction.Transactional
import jakarta.ws.rs.GET
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response

@Path("/api/users")
@ApplicationScoped
class UserController {
    @Inject
    private lateinit var userService: UserService

    @GET
    @Path("/me")
    @Transactional
    fun me(): Response {
        return Response.ok(userService.createUserFromToken()).build()
    }

    @GET
    fun getUsers(): Response {
        return Response.ok(userService.getUsers()).build()
    }
}