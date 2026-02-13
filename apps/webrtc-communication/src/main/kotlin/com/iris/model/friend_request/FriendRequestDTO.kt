package com.iris.model.friend_request

import io.smallrye.common.constraint.NotNull
import java.util.UUID

data class FriendRequestDTO (
    @NotNull
    val username: String
)
