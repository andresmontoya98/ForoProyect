export const registerUserService = async ({ username, email, password }) => {
    const response = await fetch(`http://localhost:3000/user`, {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.access;
};

export const loginUserService = async ({ email, password }) => {
    const response = await fetch(`http://localhost:3000/user/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.access;
};

export const getMyDataService = async (token) => {
    const response = await fetch(`http://localhost:3000/user/profile`, {
        headers: {
            Authorization: token,
        },
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};

export const getUserService = async (id, token) => {
    const response = await fetch(`http://localhost:3000/user/profile/${id}`, {
        headers: {
            Authorization: token,
        },
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
};

export const getLinksByIdService = async (id, token, limit, offset) => {
    const response = await fetch(`http://localhost:3000/user/links/${id}?limit=${limit}&offset=${offset}`, {
        headers: {
            Authorization: token,
        }
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};

export const getSingleLinkService = async (id, token) => {
    const response = await fetch(`http://localhost:3000/links/link-detail/${id}`, {
        headers: {
            Authorization: token,
        }
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};

export const getAllLinksService = async (token, limit, offset) => {
    const response = await fetch(`http://localhost:3000/links?limit=${limit}&offset=${offset}`, {
        headers: {
            Authorization: token,
        }
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};

export const UpdateUserService = async ({ token, data }) => {
    const response = await fetch(`http://localhost:3000/user/profile`, {
        method: 'PUT',
        headers: {
            Authorization: token,
        },
        body: data,
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.message;
};

export const sendPostService = async ({ token, data }) => {
    const response = await fetch(`http://localhost:3000/links/create`, {
        method: "POST",
        body: data,
        headers: {
            Authorization: token,
        },
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};

export const deletePostService = async ({ id, token }) => {
    const response = await fetch(`http://localhost:3000/links/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: token,
        },
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
};


export const addVoteService = async (id, token, data) => {
    const response = await fetch(`http://localhost:3000/links/${id}/ratings`, {
        method: 'POST',
        body: JSON.stringify({ rating: data }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        }
    })
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;

}


export const checkVoted = async (linkId, token) => {
    const response = await fetch(`http://localhost:3000/links/${linkId}`, {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    })

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
}

export const UpdateLinkService = async ({ id, token, data }) => {

    const response = await fetch(`http://localhost:3000/links/edit/${id}`, {
        method: "PUT",
        headers: {
            Authorization: token,
        },
        body: data

    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.message;
};

export const getCommentsByLinkIdService = async (linkId, token) => {
    const response = await fetch(`http://localhost:3000/links/comments/${linkId}`, {
        headers: {
            Authorization: token,
        }
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};

export const createCommentService = async (linkId, comment_Text, token) => {
    const response = await fetch(`http://localhost:3000/links/comments/${linkId}`, {
        method: "POST",
        body: JSON.stringify({ comment_text: comment_Text }),
        headers: {
            Authorization: token,
            "Content-Type": "application/json",
        },

    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};

export const deleteCommentService = async ({ id, token }) => {
    const response = await fetch(`http://localhost:3000/links/comments/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: token,
        },
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
};

export const UpdatePasswordService = async ({ password }) => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/user/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ password }),
    });
  
    const json = await response.json();
  
    if (!response.ok) {
      throw new Error(json.message);
    }
  
    return json.message;
  };



